import * as plays from "./play-module.js";

async function getPlay(url)
{
   try {
      let response = await fetch(url);
      console.log(response);
      let data = await response.json();
      console.log(typeof data);
      console.log(data);
      let play = new plays.Play(data);
      play.print();
      return play;
   }
   catch (err) {
      console.log('Data could not be fetched');
   }
}

document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

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