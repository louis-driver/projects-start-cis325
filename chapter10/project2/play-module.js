/* In this module, create three classes: Play, Act, and Scene. */

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
    constructor(act)
    {
        //Assign values
        this.name = act.name;
        this.scenes = new Array();
        for (let scene of act.scenes) {
            this.scenes.push(scene);
        }

    }
    //Some function
    //functionName() { do something / return something}
}

class Scene
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
    //Some function
    //functionName() { do something / return something}
}