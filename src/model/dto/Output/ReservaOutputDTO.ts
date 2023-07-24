import { Expose } from "class-transformer";

class ReservaOutputDTO {
    @Expose({ name: "id_reserva" })
    public idReserva: number;

    @Expose({ name: "id_usuario" })
    public usuario: number;

    @Expose({ name: "id_libro" })
    public libro: number;

    @Expose({ name: "fecha_reserva" })
    public dateReserva: string;

    @Expose({ name: "fecha_reserva_fin" })
    public dateFin: string;

    @Expose({ name: "estado" })
    public state: string;

    constructor(
        id_Reserva: number,
        id_usuario: number,
        id_libro: number,
        fecha_Reserva: string,
        fecha_reserva_fin: string,
        estado: string,
    ) {
        this.idReserva = id_Reserva;
        this.usuario = id_usuario;
        this.libro = id_libro;
        this.dateReserva = fecha_Reserva;
        this.dateFin = fecha_reserva_fin;
        this.state = estado;
    }
}
export default ReservaOutputDTO;