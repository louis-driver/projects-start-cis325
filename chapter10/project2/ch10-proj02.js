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
      //Only update if a play is selected
      if (e.target.value != 0) {
      //get the play
      let playUrl = url + '?name=' + e.target.value;
      play = await getPlay(playUrl);

      play.makeMarkup(playContainer, actContainer, sceneContainer, currPlayer);
      //console.log(document);
   
      let option;
      //populate the select list for the acts
      populateNameList(actList, play.acts);
   
      //Set initial scene to the first scene of the first act
      populateNameList(sceneList, play.acts[0].scenes);
   
      //populate select list for characters
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
      let currAct = play.acts[actList.selectedIndex];
      //get the current scene
      let currScene = currAct.scenes[e.target.selectedIndex];
      //populate the html based on the scene data
      //Calls the Play.makeMarkup()???
      //currScene.makeMarkup(playContainer, actContainer, sceneContainer);
      let search;
      currScene.makeMarkup(actContainer, sceneContainer, search, currPlayer);
      //console.log(document);
   });

   playerList.addEventListener('change', function (e)
   {
      if (e.target.selectedIndex != 0)
         currPlayer = play.persona[e.target.selectedIndex-1].player;
      else
         currPlayer = '';
      
      let currScene = play.acts[actList.selectedIndex].scenes[sceneList.selectedIndex];
      let search = '';
      currScene.makeMarkup(actContainer, sceneContainer, search, currPlayer);
   });

   /*
   playList.addEventListener('change', async function(e)
   {
      actList.innerHTML = '';
      sceneList.innerHTML = '';
      playerList.innerHTML = '<option value=0>All Players</option>';
      if (e.target.value != 0) {
      //get the play
      let playUrl = url + '?name=' + e.target.value;
      play = await getPlay(playUrl);

      //populate initial play information
      play.makeMarkup(qs('#playHere'), qs('#actHere'), qs('#sceneHere'));
      //updateScene(play, play.acts[0], play.acts[0].scenes[0]);

      let option;
      //populate the select list for the acts
      for (let act of play.acts)
      {
         option = ce('option');
         option.textContent = act.name;
         actList.appendChild(option);
      }

      //Set initial scene to the first scene of the first act
      for (let scene of play.acts[0].scenes)
      {
         option = ce('option');
         option.textContent = scene.name;
         sceneList.appendChild(option);
      }

      //find scenes if act changes
      actList.addEventListener('change', function (e)
      {
         //gets the current act from select list
         let currAct = play.acts.find(act => act.name === e.target.value);
         //updateScene(play, currAct, currAct.scenes[0]);
         play.makeMarkup(qs('#playHere'), qs('#actHere'), qs('#sceneHere'));

         //populate scenes based on current act
         sceneList.innerHTML = '';
         let option;
         for (let scene of currAct.scenes)
         {
            option = ce('option');
            option.textContent = scene.name;
            sceneList.appendChild(option);
         }

         //update display of current scene
         sceneList.addEventListener('change', function (e)
         {
            //get the current scene
            let currScene = currAct.scenes.find(scene => scene.name === e.target.value);
            //populate the html based on the scene data
            //updateScene(play, currAct, currScene);
            console.log(currScene);
            play.makeMarkup(qs('#playHere'), qs('#actHere'), qs('#sceneHere'));
         });
      });

      //update display of current scene when act hasn't changed
      sceneList.addEventListener('change', function (e)
      {
         //get the current scene
         let currScene = play.acts[0].scenes.find(scene => scene.name === e.target.value);
         //populate the html based on the scene data
         //updateScene(play, play.acts[0], currScene);
         play.makeMarkup(qs('#playHere'), qs('#actHere'), qs('#sceneHere'));
      });

      //populate select list for characters
      for (let persona of play.persona)
      {
         option = ce('option');
         option.textContent = persona.player;
         playerList.appendChild(option);
      }

      //Find selected player and their scenes
      playerList.addEventListener('change', function (e)
      {
         let currPlayer = play.persona.find(persona => persona.player === e.target.value);
      });

   } 
   });  */

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

   //Add event listeners to update the DOM
   //const play = new plays.Play(jcaesar);
   //console.log(play.title);

   let currUrl = url + '?name=jcaesar';
   const jcaesar = getPlay(currUrl); //getPlay isn't fullfilled when called, so jcaesar can't be used yet
   // go to page 521
});