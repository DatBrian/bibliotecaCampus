import { Expose } from "class-transformer";

class LibroOutputDTO {
    @Expose({ name: "id_libro" })
    public idLibro: number;

    @Expose({ name: "id_autor" })
    public autor: number;

    @Expose({ name: "id_categoria" })
    public categoria: number;

    @Expose({ name: "id_editorial" })
    public editorial: number;

    @Expose({ name: "titulo" })
    public title: string;

    @Expose({ name: "anio_publicacion" })
    public publicacion: number;

    @Expose({ name: "isbn" })
    public isbn: string;

    @Expose({ name: "num_paginas" })
    public paginas: number;

    @Expose({ name: "id_estado" })
    public estado: number;

    constructor(
        id_libro: number,
        id_autor: number,
        id_categoria: number,
        id_editorial: number,
        titulo: string,
        anio_publicacion: number,
        isbn: string,
        num_paginas: number,
        id_estado: number
    ) {
        this.idLibro = id_libro;
        this.autor = id_autor;
        this.categoria = id_categoria;
        this.editorial = id_editorial;
        this.title = titulo;
        this.publicacion = anio_publicacion;
        this.isbn = isbn;
        this.paginas = num_paginas;
        this.estado = id_estado;
    }
}
export default LibroOutputDTO;