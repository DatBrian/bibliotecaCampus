import { Expose } from "class-transformer";

class ReservaOutputDTO {
    @Expose({ name: "id_reserva" })
    public idReserva: number;

    @Expose({ name: "usuario" })
    public usuario: string;

    @Expose({ name: "libro" })
    public libro: string;

    @Expose({ name: "fecha_reserva" })
    public dateReserva: string;

    @Expose({ name: "fecha_reserva_fin" })
    public dateFin: string;

    @Expose({ name: "estado" })
    public state: string;

    constructor(
        id_Reserva: number,
        usuario: string,
        libro: string,
        fecha_Reserva: string,
        fecha_reserva_fin: string,
        estado: string,
    ) {
        this.idReserva = id_Reserva;
        this.usuario = usuario;
        this.libro = libro;
        this.dateReserva = fecha_Reserva;
        this.dateFin = fecha_reserva_fin;
        this.state = estado;
    }
}
export default ReservaOutputDTO;