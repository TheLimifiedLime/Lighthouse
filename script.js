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
    alert(response.data.length);
    document.body.innerText = JSON.stringify(response);
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
    alert(response.data.length);
    document.body.innerText = JSON.stringify(response);
  })
  .catch(function (error) {
    // handle error
    document.body.innerText = error.stack;
  });
