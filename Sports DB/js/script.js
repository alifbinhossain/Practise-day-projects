/* ------------------------ DECLARE REUSABLE VARIABLE ----------------------- */
const errorMessage = document.getElementById("error-message");
const spinner = `<div class="spinner-border text-dark" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;
let wrongSearched;

/* ---------------------------- FETCH & LOAD DATA --------------------------- */
const loadPlayer = async () => {
  errorMessage.innerHTML = spinner;
  const searchField = document.getElementById("search-input");
  const playerName = searchField.value;
  wrongSearched = playerName;
  searchField.value = "";
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playerName}`;

  ////////////CONDITIONS TO LOAD DATA
  if (playerName == "") {
    errorMessage.innerText = `Please enter your player name.. 🙏`;
  } else {
    const res = await fetch(url);
    const data = await res.json();
    displayPlayers(data.player);
  }
};

/* -------------------------- DISPLAY DATA ON PAGE -------------------------- */
const displayPlayers = (players) => {
  const playersConatiner = document.getElementById("Players");
  playersConatiner.textContent = "";

  ///////CONDITIONS TO EXECUTE CODE
  if (players == null) {
    errorMessage.innerText = `Sorry, ${wrongSearched} is not found 😥`;
  } else if (players != null) {
    errorMessage.innerText = `👇 Check your result below 👇`;
    players.forEach((player) => {
      //////////PLAYER INFO
      const playerName = player.strPlayer;
      const nationality = player.strNationality;
      const playerImg = player.strThumb;
      const playerClub = player.strTeam;
      const playerDOB = player.dateBorn;
      const playerPosition = player.strPosition;
      const playerFacebook = player.strFacebook;
      console.log(playerImg);
      let imgUrl = playerImg;
      if (imgUrl == null) {
        imgUrl = "../image/default2.png";
      }

      const newPlayer = document.createElement("div");
      newPlayer.innerHTML = ` 
        <div class="card h-100 p-3 text-center">
            <img class="player-dp" src="${imgUrl}" class="card-img-top" alt="..." />
          <div class="card-body mx-0 px-0 ">
            <h5 class="card-title mb-3">${playerName}</h5>
            <h6>Nationality : ${nationality}</h6>
            <h6>Date of Birth: ${playerDOB}</h6>
            <h6>Club Name: ${playerClub}</h6>
            <h6 class="mb-2">Position: ${playerPosition}</h6>
          </div>
          <a class="btn-search mx-auto mb-2" href="http://${playerFacebook}" target="_blank">Follow on facebook</a>
      </div>
      `;
      playersConatiner.appendChild(newPlayer);
    });
  }
};
