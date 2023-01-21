import { NumberSymbol } from "@angular/common";

export class Product{
    constructor(
        public id:number,
        public product:string,
        public presentation:string,
        public quantity:number,
        public price:number,
        public id_shop:number
    ){}
}