class LibroEntity{
    constructor(
        public idLibro: number,
        public autor: number,
        public categoria: number,
        public editorial: number,
        public title: string,
        public publicacion: number,
        public isbn: string,
        public paginas: number,
        public estado: number
    ) {}
}
export default LibroEntity;