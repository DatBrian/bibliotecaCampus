import { Expose } from "class-transformer";

class AutorOutputDTO {
    @Expose({ name: "nombre" })
    public name;

    @Expose({ name: "apellido" })
    public lastName;

    @Expose({ name: "nacionalidad" })
    public nationality;

    constructor(
        nombre: string,
        apellido: string,
        nacionalidad: string
    ) {
        this.name = nombre;
        this.lastName = apellido;
        this.nationality = nacionalidad;
    }
}
export default AutorOutputDTO;