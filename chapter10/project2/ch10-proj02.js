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
   //TODO maybe separate each selectList into their own event listener
   playList.addEventListener('change', async function(e)
   {
      //get the play
      let playUrl = url + '?name=' + e.target.value;
      let play = await getPlay(playUrl);
      console.log(play);

      //populate the title
      qs('#playHere h2').textContent = play.title;

      let actList = qs('#actList');
      actList.innerHTML = '';
      //populate the select list for the acts
      let option = ce('option');
      option.textContent = 'ACTS';
      actList.appendChild(option);
      for (let act of play.acts)
      {
         option = ce('option');
         option.textContent = act.name;
         actList.appendChild(option);
      }

      //find scenes for current act
      let currAct = qs('#actList').selected;
      //console.log(currAct);
      //populate select list for scene
      //for (let scene of )
      //populate select list for characters
      //update display of current scene
   });

   
   actList.addEventListener('change', function (e)
   {
      //TODO get the current act from select list
      console.log(e.target.value);
      //populate scenes based on current act
   });

   let sceneList = qs('#sceneList');
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