import { Expose } from "class-transformer";

class EditorialOutputDTO {
    @Expose({ name: "nombre" })
    public name;

    @Expose({ name: "direccion" })
    public address;

    @Expose({ name: "telefono" })
    public phone;

    constructor(
        nombre: string,
        direccion: string,
        telefono: string
    ) {
        this.name = nombre;
        this.address = direccion;
        this.phone = telefono;
    }
}
export default EditorialOutputDTO;