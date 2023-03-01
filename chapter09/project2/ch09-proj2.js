/* add your code here */
document.addEventListener("DOMContentLoaded", function()
{
    const paintings = JSON.parse(content);
    console.log(paintings);

    const parent = document.querySelector("#paintings ul");
    for (let i=0; i<paintings.length; i++)
    {
        //Uses bracket notation because value is assigned at runtime
        paintings[i]["dataset.key"] = paintings[i].id;
        let child = document.createElement("li");
        let thumbnail = document.createElement("img");
        thumbnail.src = "images/small/" + paintings[i].id + ".jpg"
        child.appendChild(thumbnail);
        parent.appendChild(child);

    }

    parent.addEventListener("click", function(e){
        if (e.target && e.target.nodeName == "IMG")
        {
            //update the details section with e's info
            console.log(e.target);
        }
    })

    console.log(paintings);
})