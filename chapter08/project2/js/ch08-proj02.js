/* add your code here */
//Parse content from photo-data.js
const photos = JSON.parse(content);

for (let p of photos)
{
    console.log(outputCard(p));
    document.write(outputCard(p));
}

function outputCard(photo)
{
    //writes the entire html for that given card
    let card = '<article><img src=images/' + photo.filename + ' alt="'
    + photo.title + '"><div class="caption"><h2>' + photo.title + '</h2><p>'
    + photo.location.city + ', ' + photo.location.country + '</p><h3>Colors</h3>'
    + outputColors(photo.colors) + '</div></article>';
    return card;
}

function outputColors(colors)
{
    let result = "";
    for (let c of colors)
    {
        result += constructColor(c) + '\n';
    }
    return result;
}

function constructColor(color)
{
    let result = '<span style="' + constructStyle(color) + '">'
    + color.name + '</span>';
    return result;
}

function constructStyle(color)
{
    let result = "background-color:" + color.hex + ";";
    if (color.luminance < 70)
        result += "color:white";
    return result;
}