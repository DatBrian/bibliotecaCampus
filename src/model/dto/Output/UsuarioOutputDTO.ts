import { Expose } from "class-transformer";

class UsuarioOutputDTO {
    @Expose({ name: "nombre" })
    public name: string;

    @Expose({ name: "apellido" })
    public lastName: string;

    @Expose({ name: "direccion" })
    public address: string;

    @Expose({ name: "telefono" })
    public phone: string;

    @Expose({ name: "email" })
    public mail: string;

    constructor(
        nombre: string,
        apellido: string,
        direccion: string,
        telefono: string,
        email: string
    ) {
        this.name = nombre;
        this.lastName = apellido;
        this.address = direccion;
        this.phone = telefono;
        this.mail = email;
    }
}
export default UsuarioOutputDTO;