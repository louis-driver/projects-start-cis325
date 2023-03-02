/* add your code here */
document.addEventListener("DOMContentLoaded", function()
{
    function f(selector){
        return document.querySelector(selector);
    }
    const paintings = JSON.parse(content);
    console.log(paintings);

    const parent = document.querySelector("#paintings ul");
    //Adds all images in paintings[] to the sidebar list
    for (let i=0; i<paintings.length; i++)
    {
        let child = document.createElement("li");
        let thumbnail = document.createElement("img");
        thumbnail.dataset.key = paintings[i].id;
        thumbnail.src = "images/small/" + paintings[i].id + ".jpg"
        child.appendChild(thumbnail);
        parent.appendChild(child);

    }

    parent.addEventListener("click", function(e){
        if (e.target && e.target.nodeName == "IMG")
        {
            //update the details section with e's info
            let painting;
            for (let i=0; i<paintings.length; i++)
            {
                if (paintings[i].id == e.target.dataset.key)
                    painting = paintings[i];
            }
            f("#title").textContent = painting.title;
            f("#artist").textContent = painting.artist;
            //Add large image to the html
            let figure = f("#details figure");
            figure.innerHTML = "";
            let image = document.createElement("img");
            image.src = "images/large/" + painting.id + ".jpg"
            figure.appendChild(image);

            //Draw a rectangle for each feture in the painting
            for (let i=0; i<painting.features.length; ++i)
            {
                let feature = painting.features[i];
                let box = document.createElement("div");
                box.className = "box";
                box.style = "position:absolute;left:"+feature.upperLeft[0]+"px;top:"
                    +feature.upperLeft[1]+"px;width:"+(feature.lowerRight[0]-feature.upperLeft[0])
                    +"px;height:"+(feature.lowerRight[1]-feature.upperLeft[1])+"px;";
                box.addEventListener("mouseout", function(e){
                    f("#description").textContent = "";
                })
                box.addEventListener("mouseover", function(e){
                    f("#description").textContent = feature.description;
                })
                figure.appendChild(box);
            }
        }
    })
})