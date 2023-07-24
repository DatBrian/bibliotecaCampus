import { Expose } from "class-transformer";

class PrestamoOutputDTO {
    @Expose({ name: "id_prestamo" })
    public idPrestamo: number;

    @Expose({ name: "usuario" })
    public usuario: string;

    @Expose({ name: "libro" })
    public libro: string;

    @Expose({ name: "fecha_prestamo" })
    public datePrestamo: string;

    @Expose({ name: "fecha_devolucion" })
    public dateDevolucion: string;

    @Expose({ name: "estado" })
    public state: string;

    constructor(
        id_prestamo: number,
        usuario: string,
        libro: string,
        fecha_prestamo: string,
        fecha_devolucion: string,
        estado: string,
    ) {
        this.idPrestamo = id_prestamo;
        this.usuario = usuario;
        this.libro = libro;
        this.datePrestamo = fecha_prestamo;
        this.dateDevolucion = fecha_devolucion;
        this.state = estado;
    }
}
export default PrestamoOutputDTO;