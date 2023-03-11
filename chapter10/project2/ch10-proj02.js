import * as plays from "./play-module.js";

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

document.addEventListener("DOMContentLoaded", function() {
   function qs(selector) {
      return document.querySelector(selector);
   }
   function qsa(selector) {
      return document.querySelectorAll(selector);
   }
   function ce(element) {
      return document.createElement(element);
   }
	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   const playList = qs('#playList');
   let actList = qs('#actList');
   let sceneList = qs('#sceneList');
   let playerList = qs('#playerList');
   let play;
   //TODO maybe separate each selectList into their own event listener
   playList.addEventListener('change', async function(e)
   {
      actList.innerHTML = '';
      sceneList.innerHTML = '';
      playerList.innerHTML = '<option value=0>All Players</option>';
      if (e.target.value != 0) {
      //get the play
      let playUrl = url + '?name=' + e.target.value;
      play = await getPlay(playUrl);
      console.log(play);

      //populate the title
      qs('#playHere h2').textContent = play.title;

      actList.innerHTML = '';
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

         //populate scenes based on current act
         sceneList.innerHTML = '';
         let option;
         for (let scene of currAct.scenes)
         {
            option = ce('option');
            option.textContent = scene.name;
            sceneList.appendChild(option);
         }
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
         let currPlayer = play.persona.find(player => e.target.value);
      });
      //update display of current scene
   }});

   /*
   actList.addEventListener('change', function (e)
   {
      //gets the current act from select list
      console.log(e.target.value);
      let currAct;
      for (let act of play.acts)
      {
         if (e.target.value === act.name)
            currAct = act;
      }

      //populate scenes based on current act
      let sceneList = qs('#sceneList');
      sceneList.innerHTML = '';
      let option = ce('option');
      option.textContent = 'Scenes';
      option.value = 0;
      sceneList.appendChild(option);
      for (let scene of currAct.scenes)
      {
         option = ce('option');
         option.textContent = scene.name;
         sceneList.appendChild(option);
      }
   }); */

   sceneList.addEventListener('change', function (e)
   {
      //get the current scene
      //populate the html based on the scene data
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

   //Add event listeners to update the DOM
   //const play = new plays.Play(jcaesar);
   //console.log(play.title);

   let currUrl = url + '?name=jcaesar';
   const jcaesar = getPlay(currUrl); //getPlay isn't fullfilled when called, so jcaesar can't be used yet
   // go to page 521
});