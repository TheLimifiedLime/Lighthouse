const rawToken = window.location.href.match(/access_token=[+A-z0-9]{1,30}/);
if (!rawToken) {
  window.location.href = `https://discord.com/oauth2/authorize?prompt=none&response_type=token&client_id=796490540619137024&state=15773059ghq9183habn&scope=identify%20guilds`;
}
const token = rawToken[0].replace("access_token=", "");
//alert(token)

axios
  .get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then(function (response) {
    // handle success
    //alert(response.data);
    document.getElementById(
      "avatar"
    ).src = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}?size=4096`;
    document.getElementById("avatar").classList.add("border-8");
    document.getElementById(
      "welcome"
    ).innerText = `Hey, ${response.data.username}#${response.data.discriminator}`;
  })
  .catch(function (error) {
    // handle error
    document.body.innerText = error.stack;
  });

axios
  .get("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then(function (response) {
    // handle success
    //document.getElementById('counter-container').innerText = `You are in guilds`
    document.getElementById(
      "counter-container"
    ).innerHTML = `You are in <span id="counter" class="text-center text-green-500 text-3xl font-mono">${response.data.length}</span>`;
  })
  .catch(function (error) {
    // handle error
    alert(error.stack);
  });
