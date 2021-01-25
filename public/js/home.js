async function run() {
  const rawToken = await window.location.href.match(
    /access_token=[+A-z0-9]{1,30}/
  );
  if (!rawToken) {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=796490540619137024&prompt=none&redirect_uri=https%3A%2F%2FLighthouse-Beta.thelimifiedlime.repl.co&response_type=token&scope=guilds%20identify`;
  }
  const token = await rawToken[0].replace("access_token=", "");
  //window.history.pushState({}, "", " ");

  await axios
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
      console.log(error);
    });

  await axios
    .get("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      document.getElementById(
        "counter"
      ).innerHTML = `You are in <span id="counter" class="text-center text-green-500 text-5xl font-mono">${response.data.length}</span> servers!`;
      document.getElementById("spinner").style.display = `none`;
      document.getElementById("curtain").style.display = `block`;
    })
    .catch(function (error) {
      console.log(error);
    });
  document.getElementById("spinner").style.display = `none`;
  document.getElementById("curtain").style.display = `block`;
}

run();
