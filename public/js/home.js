async function run() {
  // Here we use regex to get the access token from the callback
  const rawToken = await window.location.href.match(/token=[A-z0-9]{30}/);

  let token;
  // If there isn't a token in the url (like when opening the site for the first time) it redirects the user to the auth page
  if (!rawToken) {
    if (document.cookie) {
      const rawCookieToken = await document.cookie.match(/token=[A-z0-9]{30}/);
      if (!rawCookieToken) {
        window.location.href = `https://discord.com/api/oauth2/authorize?prompt=none&client_id=796490540619137024&redirect_uri=https%3A%2F%2Flighthouse.issai.club&response_type=token&scope=identify%20guilds`;
      }
      token = await rawCookieToken[0].replace("token=", "");
    } else {
      window.location.href = `https://discord.com/api/oauth2/authorize?prompt=none&client_id=796490540619137024&redirect_uri=https%3A%2F%2Flighthouse.issai.club&response_type=token&scope=identify%20guilds`;
    }
  } else {
    // If there is a token it removes the first part to leave the token by itself
    token = await rawToken[0].replace("token=", "");
    const date = new Date();
    // https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object#1051641
    const rawTime = await window.location.href.match(/in=[0-9]{6}/);
    const time = parseInt(rawTime[0].replace(`in=`, ``), 10);
    date.setTime(date.getTime() + Math.floor(time / 60 / 60) * 60 * 60 * 1000);
    document.cookie = `token=${token};expires=${date}"`;
  }

  let infoFetchError;
  let guildFetchError;

  // "Clears" the ur at the top of the users browser to prevent showing the token any longer than necessary
  window.history.pushState({}, "", " ");

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
