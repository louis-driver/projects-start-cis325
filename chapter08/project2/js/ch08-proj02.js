//Parse content from photo-data.js
const photos = JSON.parse(content);

//Write all cards to the html document
for (let p of photos)
{
    console.log(outputCard(p));
    document.write(outputCard(p));
}

//Writes the entire html for a given card
function outputCard(photo)
{
    let card = '<article><img src=images/' + photo.filename + ' alt="'
    + photo.title + '"><div class="caption"><h2>' + photo.title + '</h2><p>'
    + photo.location.city + ', ' + photo.location.country + '</p><h3>Colors</h3>'
    + outputColors(photo.colors) + '</div></article>';
    return card;
}

//Creates html for all colors in a card
function outputColors(colors)
{
    let result = "";
    for (let c of colors)
    {
        result += constructColor(c);
    }
    return result;
}

//Creates the html for a color
function constructColor(color)
{
    let result = '<span style="' + constructStyle(color) + '">'
    + color.name + '</span>';
    return result;
}

//Defines the CSS style for a color
function constructStyle(color)
{
    let result = "background-color:" + color.hex + ";";
    if (color.luminance < 70)
        result += "color:white";
    return result;
}