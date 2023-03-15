import * as plays from "./play-module.js";

function qs(selector) {
   return document.querySelector(selector);
}
function ce(element) {
   return document.createElement(element);
}

async function getPlay(url)
{
   try {
      let response = await fetch(url);
      let data = await response.json();
      let play = new plays.Play(data);
      return play;
   }
   catch (err) {
      console.log('Data could not be fetched');
   }
}

function populateNameList(selectList, data)
{
   selectList.innerHTML = '';
   let option;
   for (let d of data)
   {
      option = ce('option');
      option.textContent = d.name;
      selectList.appendChild(option);
   }
}

document.addEventListener("DOMContentLoaded", function() {
	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   const playList = qs('#playList');
   const actList = qs('#actList');
   const sceneList = qs('#sceneList');
   const playerList = qs('#playerList');

   const playContainer = qs('#playHere');
   const actContainer = qs('#actHere');
   const sceneContainer = qs('#sceneHere');

   let play;
   let currPlayer = '';
   playList.addEventListener('change', async function(e)
   {
      currPlayer = '';
      //Only update if a play is selected
      if (e.target.value != 0) {
      //get the play
      let playUrl = url + '?name=' + e.target.value;
      play = await getPlay(playUrl);

      play.makeMarkup(playContainer, actContainer, sceneContainer, currPlayer);

      //populate the select list for the acts
      populateNameList(actList, play.acts);
   
      //Set initial scene to the first scene of the first act
      populateNameList(sceneList, play.acts[0].scenes);
   
      //populate select list for characters
      let option;
      playerList.innerHTML = '<option value=0>All Players</option>';
      for (let persona of play.persona)
      {
         option = ce('option');
         option.textContent = persona.player;
         playerList.appendChild(option);
      }
      }
   });

   actList.addEventListener('change', function (e)
   {
      //gets the current act from select list
      let currAct = play.acts[e.target.selectedIndex];
      currAct.makeMarkup(playContainer, actContainer, sceneContainer, currPlayer);

      //populate scenes based on current act
      populateNameList(sceneList, currAct.scenes);
   });

   //update display of current scene
   sceneList.addEventListener('change', function (e)
   {
      //get the current scene
      let currScene = play.acts[actList.selectedIndex].scenes[e.target.selectedIndex];
      //populate the html based on the scene data
      let search;
      currScene.makeMarkup(actContainer, sceneContainer, search, currPlayer);
   });

   playerList.addEventListener('change', function (e)
   {
      //get selected character
      if (e.target.selectedIndex != 0)
         currPlayer = play.persona[e.target.selectedIndex-1].player;
      else
         currPlayer = '';
      
      //Update scene to reflect only that character's lines
      let currScene = play.acts[actList.selectedIndex].scenes[sceneList.selectedIndex];
      let search = '';
      currScene.makeMarkup(actContainer, sceneContainer, search, currPlayer);
   });

   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});