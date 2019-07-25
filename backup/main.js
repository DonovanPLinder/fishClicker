var gameData = {
  fish: 0,
  fishPerClick: 1,
  fishPerClickCost: 10,
  fisherman: 1,
  villagers: 0,
  gold: 0,
  fishermanCost: 1,
  fishPerSecond: 1,
  villagersUpkeep: 1,

}
var gameFish = {
  catFish: 0,
 troutFish: 0,
 salmonFish: 0,
 bassFish: 0,
}
// FISH
function catchDifFish() {
  var randomNum = Math.random();
  if(randomNum < .995){
    // alert("hello")
    var commonFishArray = ['numberOfCatFish', 'numberOfTroutFish', 'numberOfSalmonFish', 'numberOfBassFish'];
    var commonFish = commonFishArray[Math.floor(Math.random() * commonFishArray.length)];
    switch (commonFish) {
      case commonFishArray[0]:
        gameFish.catFish = gameFish.catFish += 1;
        document.getElementById(commonFish).innerHTML = " # of Cat Fish: " + gameFish.catFish;
      break;
      case commonFishArray[1]:
        gameFish.troutFish = gameFish.troutFish += 1;
        document.getElementById(commonFish).innerHTML = " # of Trout Fish: " + gameFish.troutFish;
      break;
      case commonFishArray[2]:
        gameFish.salmonFish = gameFish.salmonFish += 1;
        document.getElementById(commonFish).innerHTML = " # of Salmon Fish: " + gameFish.salmonFish;
      break;
      case commonFishArray[3]:
        gameFish.bassFish = gameFish.bassFish += 1;
        document.getElementById(commonFish).innerHTML = " # of Bass Fish: " + gameFish.bassFish;
      break;

    }

  }
  gameData.fish += gameData.fishPerClick
  document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught"
}
function consumeFish(){

}

// function catchFish() {
//   gameData.fish += gameData.fishPerClick
//   document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught"
// }
function addFish(){
  gameData.fishPerSecond = gameData.fisherman - gameData.villagersUpkeep
  gameData.fish += gameData.fishPerSecond
  document.getElementById("fishCaught").innerHTML = gameData.fish + " Fish Caught"

}
function buyFishPerClick(){
  if(gameData.fish >= gameData.fishPerClickCost){
    gameData.fish -= gameData.fishPerClickCost
    gameData.fishPerClick += 1
    gameData.fishPerClickCost *= 2
    document.getElementById("fishCaught").innerHTML = gameData + " Fish Caught"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Fishing Rod (Current Level " +
    gameData.fishPerClick + ") Cost: " + gameData.fishPerClickCost + " Fish"
  }
}
// GOLD
function addGold(){
  var totalGold =  gameData.gold += gameData.villagers / 5
  totalGold = totalGold.toFixed(1);
  document.getElementById("totalGold").innerHTML = totalGold + "Gold"
  totalGold = parseInt(totalGold);
}


// FISHERMAN
function fishermanMake() {
  alert(gameData.fishermanCost);
  if(gameData.gold < gameData.fishermanCost){
    document.getElementById("error").innerHTML = "You cannot buy a fisherman"
  }
  else{
  gameData.fisherman += 1
  gameData.gold = gameData.gold - gameData.fishermanCost
  gameData.fishermanCost = (gameData.fishermanCost *= 2)
  document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  document.getElementById("totalGold").innerHTML = gameData.gold + "Gold"
}
}
// VILLAGERS
function villagersMake(){
  if (gameData.fisherman == 0){
    alert("You cannot convert if you have no fisherman");
  }
  else if (gameData.fisherman > 0) {
    gameData.villagers += 1
    gameData.fisherman -= 1
    upKeep()
    document.getElementById("villagers").innerHTML = gameData.villagers + " villagers"
    document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  }
}

function villagersTrade(){
  if(gameData.villagers == 0){
    alert("YOU CANNOT MAKE NO CONVERT FISHERMAN WITHOUT VILLAGERS")
  }
  else if (gameData.villagers > 0) {
    gameData.villagers -= 1
    gameData.fisherman += 1
    upKeep()
    document.getElementById("villagers").innerHTML = gameData.villagers + " villagers"
    document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"

  }
}

function upKeep(){
  gameData.villagersUpkeep = gameData.villagers * 1
}
//GAMESAVE-MAINTANENCE
var mainGameLoop = window.setInterval(function() {
}, 100)

var fishermanLoop = window.setInterval(function(){
  addFish();
}, 1000)

var villagerLoop = window.setInterval(function(){
  addGold();
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('fishingIncrementalSave', JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("fishingIncrementalSave"))
if (savegame !== null) {
  gameData = savegame
}
// Time Bar--------------------------------------------------------------------------------
var expeditionCostFisherman = [1, 3, 8, 15];
var expeditionCostGold = [10, 15, 25, 50];
var expeditionCostTime = [1, 2, 5, 10];
function startExpedition(){
if(gameData.fisherman < expeditionCostFisherman[0]){
  document.getElementById("expeditionError").innerHTML = "Not Enough Funds";
}
else{
  gameData.totalGold = gameData.totalGold - expeditionCostGold[0]
  gameData.fisherman = gameData.fisherman - expeditionCostFisherman[0]
  document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  document.getElementById("totalGold").innerHTML = gameData.totalGold + " gold"
  var width = 0;
  var elem = document.getElementById("myBar");
  var myVar = setInterval(function(){
    if(width < 60){
      width++;
      elem.style.width = width + '%';
    }
    else{
      gameData.fisherman = gameData.fisherman + expeditionCostFisherman[0]
      gameData.totalGold = gameData.totalGold + expeditionCostGold[0]
    }
  },1000*expeditionCostTime[3]);
}
}
// Expedition -------------------------------------------------------
var expeditionsArray = [
  [1, 10, 1]
];
// var expeditionCostGold = [, 15, 25, 50];
// var expeditionCostTime = [1, 2, 5, 10];
function startExpedition(){
if(gameData.fisherman < expeditionsArray[0][0]){
  document.getElementById("expeditionError").innerHTML = "Not Enough Funds";
}
else{
  gameData.totalGold = gameData.totalGold - expeditionsArray[0][1]
  gameData.fisherman = gameData.fisherman - expeditionsArray[0][2]
  document.getElementById("fisherman").innerHTML = gameData.fisherman + " fisherman"
  document.getElementById("totalGold").innerHTML = gameData.totalGold + " gold"
  var width = 0;
  var elem = document.getElementById("myBar");
  var myVar = setInterval(function(){
    if(width < 60){
      width++;
      elem.style.width = width + '%';
    }
    else{
      gameData.fisherman = gameData.fisherman + expeditionsArray[0][0]
      gameData.totalGold = gameData.totalGold + expeditionsArray[0][1]
    }
  },1000*expeditionsArray[0][1]);
}
}
