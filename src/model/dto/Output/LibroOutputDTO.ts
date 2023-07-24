import { Expose } from "class-transformer";

class LibroOutputDTO {
    @Expose({ name: "id_libro" })
    public idLibro: number;

    @Expose({ name: "autor" })
    public autor: string;

    @Expose({ name: "categoria" })
    public categoria: string;

    @Expose({ name: "editorial" })
    public editorial: string;

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
        autor: string,
        categoria: string,
        editorial: string,
        titulo: string,
        anio_publicacion: number,
        isbn: string,
        num_paginas: number,
        id_estado: number
    ) {
        this.idLibro = id_libro;
        this.autor = autor;
        this.categoria = categoria;
        this.editorial = editorial;
        this.title = titulo;
        this.publicacion = anio_publicacion;
        this.isbn = isbn;
        this.paginas = num_paginas;
        this.estado = id_estado;
    }
}
export default LibroOutputDTO;