/* add your code here */
document.addEventListener("DOMContentLoaded", function()
{
    const paintings = JSON.parse(content);
    console.log(paintings);

    const parent = document.querySelector("#paintings ul");
    for (let i=0; i<paintings.length; i++)
    {
        let child = document.createElement("li");
        let thumbnail = document.createElement("img");
        thumbnail.dataset.key = paintings[i].id;
        console.log(thumbnail.dataset.key);
        thumbnail.src = "images/small/" + paintings[i].id + ".jpg"
        child.appendChild(thumbnail);
        parent.appendChild(child);

    }

    parent.addEventListener("click", function(e){
        if (e.target && e.target.nodeName == "IMG")
        {
            
            //update the details section with e's info
            let key = e.target.dataset.key;
            let painting;
            for (let i=0; i<paintings.length; i++)
            {
                if (paintings[i].id == key)
                    painting = paintings[i];
            }
            document.querySelector("#title").textContent = painting.title;
        }
    })

    console.log(paintings);
})