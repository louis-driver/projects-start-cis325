/* In this module, create three classes: Play, Act, and Scene. */

export class Play
{
    constructor(content, document)
    {
        //Assign values
        this.document = document;
        this.title = content.title;
        this.titleShort = content.short;
        this.persona = content.persona;
        this.acts = new Array();
        for (let act of content.acts) {
            this.acts.push(new Act(act, document));
        }   
    }

    print()
    {
        console.log(this.title);
        console.log(this.titleShort);
        console.log(this.acts)
    }
    //Some function
    //functionName() { do something / return something}
}

class Act
{
    constructor(act, document)
    {
        //Assign values
        //this.document = document;
        this.name = act.name;
        this.scenes = new Array();
        for (let scene of act.scenes) {
            this.scenes.push(new Scene(scene));
        }
    }
    //Some function
    //functionName() { do something / return something}
    makeMarkup()
    {
        return 0;
    }
}

class Scene
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
    //Some function
    //functionName() { do something / return something}
    makeMarkup()
    {
        let div = document.createElement('div');
        div.id = 'sceneHere';
        let sceneName = document.createElement('h4');
        sceneName.textContent = this.name;

        div.appendChild(sceneName);
        document.querySelector('#actHere').appendChild(div);
    }
}