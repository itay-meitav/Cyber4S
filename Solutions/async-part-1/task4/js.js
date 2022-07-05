async function loadJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (response.status == 200) {
    return data;
  } else {
    throw new Error(response.status);
  }
}
loadJson("https://javascript.info/no-such-user.json").catch(alert);
