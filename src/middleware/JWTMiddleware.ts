import { NextFunction, Request, Response } from 'express';
import { SignJWT } from 'jose';
import env from "../config/EnvConfig";

class JWTMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            //* Generando el JWT
            const encoder = new TextEncoder();
            const jwt = await new SignJWT({ ...req.body })
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime('1h')
                .sign(encoder.encode(env.JWT_PRIVATE_KEY));
            //* Guardando el JWT generado en una cookie
            res.cookie('token', jwt, { httpOnly: true });
            next();
        } catch (error: any) {
            console.error('Error al generar el token:', error.message);
            res.status(500).json({ error: 'Error al generar el token' });
        }
    }
}
export default new JWTMiddleware();