import { JWTPayload, jwtVerify } from "jose";

export async function verifyJWT(token: string): Promise<JWTPayload> {
    const encoder = new TextEncoder();
    try {
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )
        const body = jwtData.payload
        delete body.iat;
        delete body.exp;

        return body
    } catch (error) {
        throw new Error('El token aún no se ha generado, espere unos segundos y vuelva a intentarlo :(')
    }
}