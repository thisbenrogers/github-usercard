let cardsEntry = document.querySelector(".cards");
let graphEntry = document.querySelector(".graph");
let followersEntry = document.querySelector(".followers");

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/thisbenrogers')
  .then(response => {
    // console log below for validating data
    cardsEntry.appendChild(createCard(response.data));
  })
  .catch(err => {
    console.log("There was an error: ", err);
  })
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

getFollowerData = follower => {
  axios.get(`https://api.github.com/users/${follower}`)
    .then(response => {
      followersEntry.appendChild(createCard(response.data));
    })
}

axios.get('https://api.github.com/users/thisbenrogers/followers')
  .then(response => {
    response.data.forEach(follower => {
      getFollowerData(follower.login);
    })
  })
  .catch(err => {
    console.log("There was an error: ", err);
  })

// followersArray.forEach(follower => {
//   cards.appendChild(createCard(follower));
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
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
/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
