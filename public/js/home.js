const rawToken = window.location.href.match(/access_token=[+A-z0-9]{1,30}/);
if (!rawToken) {
  window.location.href = `https://discord.com/api/oauth2/authorize?prompt=none&client_id=796490540619137024&redirect_uri=https%3A%2F%2Flighthouse.issai.club&response_type=token&scope=guilds%20identify`;
}
const token = rawToken[0].replace("access_token=", "");
window.history.pushState({}, "", " ");

axios
  .get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then(function (response) {
    document.getElementById(
      "avatar"
    ).src = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}?size=4096`;
    document.getElementById("avatar").classList.add("border-8");
    document.getElementById(
      "welcome"
    ).innerText = `Hey, ${response.data.username}#${response.data.discriminator}`;
  })
  .catch(function (error) {
    alert(`An error occured while fetching your user info`);
  });

axios
  .get("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  .then(function (response) {
    document.getElementById(
      "counter-container"
    ).innerHTML = `You are in <span id="counter" class="text-center text-green-500 text-5xl font-mono">${response.data.length}</span> guilds!`;
    document.getElementById("spinner").style.display = `none`;
    document.getElementById("curtain").style.display = `block`;
  })
  .catch(function (error) {
    alert(`An error occured while fetching your server count`);
  });
