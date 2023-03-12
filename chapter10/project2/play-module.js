/* In this module, create three classes: Play, Act, and Scene. */

function qs(selector) {
    return document.querySelector(selector);
 }
 function qsa(selector) {
    return document.querySelectorAll(selector);
 }
 function ce(element) {
    return document.createElement(element);
}

export class Play
{
    constructor(content)
    {
        //Assign values
        this.title = content.title;
        this.titleShort = content.short;
        this.persona = content.persona;
        this.acts = new Array();
        for (let act of content.acts) {
            this.acts.push(new Act(act));
        }   
    }
    //Some function
    //functionName() { do something / return something}
    makeMarkup(playContainer, actContainer, sceneContainer)
    {
        //console.log('Play:' + sceneContainer);
        playContainer.innerHTML = '';
        let playTitle = ce('h2');
        playTitle.textContent = this.title;
        playContainer.appendChild(playTitle);
        this.acts[0].makeMarkup(playContainer, actContainer, sceneContainer);
    }
}

export class Act
{
    constructor(act)
    {
        //Assign values
        this.name = act.name;
        this.scenes = new Array();
        for (let scene of act.scenes) {
            this.scenes.push(new Scene(scene));
        }
    }
    //Some function
    //functionName() { do something / return something}
    makeMarkup(playContainer, actContainer)
    {
        //console.log('Act:' + sceneContainer);
        actContainer.innerHTML = '';
        let actName = ce('h3')
        actName.textContent = this.name;
        let sceneHere = ce('div');
        sceneHere.id = 'sceneHere';
        actContainer.appendChild(sceneHere);
        this.scenes[0].makeMarkup(actContainer, sceneHere, 1, 1);
        playContainer.appendChild(actContainer);
    }
}

export class Scene
{
    constructor(scene)
    {
        //Assign values
        //this.document = document;
        this.name = scene.name;
        this.title = scene.title;
        this.stageDirection = scene.stageDirection;
        this.speeches = new Array();
        for (let speech of scene.speeches) {
            this.speeches.push(speech);
        }
    }

    makeMarkup(actContainer, container, search, player)
    {
        //console.log('Scene:' + container);
        container.innerHTML = '';
        let sceneName = ce('h4');
        sceneName.textContent = this.name;
        let sceneTitle = ce('p');
        sceneTitle.classList.add('title');
        sceneTitle.textContent = this.title;
        let direction = ce('p');
        direction.classList.add('direction');
        direction.textContent = this.stageDirection;

        container.appendChild(sceneName);
        container.appendChild(sceneTitle);
        container.appendChild(direction);

        this.outputSpeeches(container, search, player);
        actContainer.appendChild(container);
    }

    outputSpeeches(container, search, player)
    {
        const divs = this.speeches.map( sp => {
            
            let div = ce('div');
            div.classList.add('speech');
            //if (player && sp.speaker != player && player != 0)
                //return div;
            
            let speaker = ce('span');
            speaker.textContent = sp.speaker;
            div.appendChild(speaker);

            let lines = sp.lines.map( ln => {
                let line = ce('p');
                line.textContent = ln;
                return line;
            })

            lines.forEach(ln => div.appendChild(ln));

            if (sp.stagedir){
                let em = ce('em');
                em.textContent = sp.stagedir;
                div.appendChild(em);
            }

            return div;
        })
        divs.forEach( div => container.appendChild(div));
    }
}