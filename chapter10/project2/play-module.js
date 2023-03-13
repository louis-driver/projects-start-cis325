/* In this module, create three classes: Play, Act, and Scene. */

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

    makeMarkup(playContainer, actContainer, sceneContainer, player)
    {
        playContainer.innerHTML = '';
        let playTitle = ce('h2');
        playTitle.textContent = this.title;
        playContainer.appendChild(playTitle);
        this.acts[0].makeMarkup(playContainer, actContainer, sceneContainer, player);
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

    makeMarkup(playContainer, actContainer, sceneContainer, player)
    {
        //console.log('Act:' + sceneContainer);
        actContainer.innerHTML = '';
        let actName = ce('h3');
        actName.textContent = this.name;
        actContainer.appendChild(actName);
        this.scenes[0].makeMarkup(actContainer, sceneContainer, 1, player);
        playContainer.appendChild(actContainer);
    }
}

export class Scene
{
    constructor(scene)
    {
        //Assign values
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
            //console.log("Speaker: " + sp.speaker);
            //console.log("Player: " + player);
            if (sp.speaker != player && player != '')
                return div;
            
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