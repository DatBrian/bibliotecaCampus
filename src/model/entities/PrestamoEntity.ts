class PrestamoEntity{
    constructor(
        public idPrestamo: number,
        public usuario: number,
        public libro: number,
        public datePrestamo: string,
        public dateDevolucion: string,
        public state: string
    ){}
}