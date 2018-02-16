export class Recipe{
    title:string;
    description:string;
    difficulty:string;
    constructor( title:string,description:string,difficulty:string){
        this.title=title;
        this.description=description;
        this.difficulty=difficulty;
    }
}