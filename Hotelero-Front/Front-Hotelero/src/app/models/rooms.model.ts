export class  ModelRooms{
    constructor(
        public id: String,
        public roomNum: Number,
        public description: String,
        public available: Boolean,
        public price: Number,
        public hotel: String,
        public user: String
    ){}
}