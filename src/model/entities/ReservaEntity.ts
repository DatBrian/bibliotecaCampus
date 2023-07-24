class ReservaEntity {
    constructor(
        public idReserva: number,
        public usuario: number,
        public libro: number,
        public dateReserva: string,
        public dateFin: string,
        public state: string
    ) { }
}