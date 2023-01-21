export class Order{

    public constructor(
        public id:number,
        public id_shop:number,
        public id_product:number,
        public quantity:number,
        public unit_value:number,
        public full_value:number,
        public domicile_value:number,
        public id_user:number
    ){}
}