import { Expose, Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

class ParamsInputDTO {
    @Expose({ name: 'id' })
    @Transform(({ value }) => {
        return /^[0-9]+$/.test(value) || typeof value === "undefined"
            ? value
            : (() => { throw new Error("El id proporcionado no es un parámetro válido, ingrese un número entero >:("); })();
    }, { toClassOnly: true })
    @IsNumber()
    public id: number;

    @Expose({ name: 'ubication' })
    @IsString()
    @Transform(({ value }) => {
        return /^.{1,25}$/.test(value)
            ? value
            : (() => { throw new Error(`El parámetro "ubication" proporcionado no es válido, no puede exceder de los 25 caracteres`); })();
    }, { toClassOnly: true })
    public ubication: string

    @Expose({ name: 'category' })
    @IsString()
    @Transform(({ value }) => {
        return /^.{1,25}$/.test(value)
            ? value
            : (() => { throw new Error(`El parámetro "category" proporcionado no es válido, no puede exceder de los 25 caracteres`); })();
    }, { toClassOnly: true })
    public category: string

    constructor(
        id: number,
        ubication: string,
        category: string
    ) {
        this.id = id;
        this.ubication = ubication;
        this.category = category;
    }
}
export default ParamsInputDTO;