import { Expose } from "class-transformer";

class PrestamoOutputDTO {
    @Expose({ name: "id_prestamo" })
    public idPrestamo: number;

    @Expose({ name: "id_usuario" })
    public usuario: number;

    @Expose({ name: "id_libro" })
    public libro: number;

    @Expose({ name: "fecha_prestamo" })
    public datePrestamo: string;

    @Expose({ name: "fecha_devolucion" })
    public dateDevolucion: string;

    @Expose({ name: "estado" })
    public state: string;

    constructor(
        id_prestamo: number,
        id_usuario: number,
        id_libro: number,
        fecha_prestamo: string,
        fecha_devolucion: string,
        estado: string,
    ) {
        this.idPrestamo = id_prestamo;
        this.usuario = id_usuario;
        this.libro = id_libro;
        this.datePrestamo = fecha_prestamo;
        this.dateDevolucion = fecha_devolucion;
        this.state = estado;
    }
}
export default PrestamoOutputDTO;