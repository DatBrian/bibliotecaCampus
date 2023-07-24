import { Expose } from "class-transformer";

class CategoriaOutputDTO {
    @Expose({ name: "nombre" })
    public name;

    constructor(
        nombre: string
    ) {
        this.name = nombre;
    }
}
export default CategoriaOutputDTO;