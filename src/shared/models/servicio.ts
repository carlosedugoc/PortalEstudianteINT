import { Item } from "./item";
export class Servicio {
    constructor(
        public id:number,
        public nombre:string,
        public tipo:number,
        public datos:Item[],
        public url:string,
        public Habilitar:boolean
    ){}
}
