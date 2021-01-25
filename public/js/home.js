async function run() {
  // Here we use regex to get the access token from the callback
  const rawToken = await window.location.href.match(
    /access_token=[+A-z0-9]{1,30}/
  );

  // If there isn't a token in the url (like when opening the site for the first time) it redirects the user to the auth page
  if (!rawToken) {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=796490540619137024&prompt=none&redirect_uri=https%3A%2F%2FLighthouse-Beta.thelimifiedlime.repl.co&response_type=token&scope=guilds%20identify`;
  }

  // If there is a token it removes the first part to leave the token by itself
  const token = await rawToken[0].replace("access_token=", "");
  let infoFetchError;
  let guildFetchError;

  // "Clears" the ur at the top of the users browser to prevent showing the token any longer than necessary
  //window.history.pushState({}, "", " ");

  // Sends a request to Discord's API to fetch basic user info used for the picture and greeting
  await axios
    .get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      // Edits the image element and set it to the users avatar
      document.getElementById(
        "avatar"
      ).src = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}?size=4096`;
      // Adds the border around the image
      document.getElementById("avatar").classList.add("border-8");
      // Adds the greeting to the welcome element
      document.getElementById(
        "welcome"
      ).innerText = `Hey, ${response.data.username}#${response.data.discriminator}`;
    })
    .catch(function (error) {
      infoFetchError = true;
      console.log(error);
    });

  // Fetches the guilds from the user so we can count them
  await axios
    .get("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      // Edits the counter to display the number of guilds
      document.getElementById(
        "counter"
      ).innerHTML = `You are in <span id="counter" class="text-center text-green-500 text-5xl font-mono">${response.data.length}</span> servers!`;
    })
    .catch(function (error) {
      guildFetchError = true;
      console.log(error);
    });
  // Hides spinner
  document.getElementById("spinner").style.display = `none`;
  // Unhides everything elseo covered by the "curtain"
  document.getElementById("curtain").style.display = `block`;

  if (infoFetchError || guildFetchError) {
    window.location.href = `https://${window.location.hostname}/error`;
  }
}

run();
