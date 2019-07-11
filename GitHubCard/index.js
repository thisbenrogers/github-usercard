let cardsEntry = document.querySelector(".cards");
let followersEntry = document.querySelector(".followers");

createCard = object => {
  // create elements
  let card = document.createElement("div");
  let img = document.createElement("img");
  let info = document.createElement("div");
  let name = document.createElement("h3");
  let userName = document.createElement("p");
  let location = document.createElement("p");
  let profile = document.createElement("p");
  let link = document.createElement("a");
  let followers = document.createElement("p");
  let following = document.createElement("p");
  let bio = document.createElement("p");

  // assign classes and other properties
  card.classList.add("card");
  img.src = object.avatar_url;
  info.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");
  link.href = object.html_url;

  // assign text content
  name.textContent = object.name;
  userName.textContent = object.login;
  location.textContent = `Location: ${object.location}`;
  profile.textContent = 'Profile: ';
  link.textContent = object.html_url;
  followers.textContent = `Followers: ${object.followers}`;
  following.textContent = `Following: ${object.following}`;
  bio.textContent = object.bio ? `Bio: ${object.bio}` : "Bio: none";

  // assign children
  let nestedFragment = document.createDocumentFragment();
  let fragment = document.createDocumentFragment();

  profile.appendChild(link);

  nestedFragment.appendChild(name);
  nestedFragment.appendChild(userName);
  nestedFragment.appendChild(location);
  nestedFragment.appendChild(profile);
  nestedFragment.appendChild(followers);
  nestedFragment.appendChild(following);
  nestedFragment.appendChild(bio);

  info.appendChild(nestedFragment);

  fragment.appendChild(img);
  fragment.appendChild(info);

  card.appendChild(fragment);

  return card;
}


getFollowerData = follower => {
  axios.get(`https://api.github.com/users/${follower}`)
    .then(response => {
      followersEntry.appendChild(createCard(response.data));
    })
    .catch(err => {
      console.log("There was an error: ", err);
    })
}


getMyFollowers = url => {
  axios.get(url)
    .then(response => {
      response.data.forEach(follower => {
        getFollowerData(follower.login);
      })
    })
    .catch(err => {
      console.log("There was an error: ", err);
    })
}


axios.get('https://api.github.com/users/thisbenrogers')
  .then(response => {
    cardsEntry.appendChild(createCard(response.data));
    getMyFollowers(response.data.followers_url);
  })
  .catch(err => {
    console.log("There was an error: ", err);
  })
