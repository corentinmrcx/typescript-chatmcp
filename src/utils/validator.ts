import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z } from 'zod';
import { ZodError } from 'zod/v4';

export function validateBody<T>(schema: z.Schema<T>): RequestHandler {
    // retourne une fonction de type RequestHandler qui valide le 
    // corps de la requête à l'aide du schéma passé en paramètre
    // et invoque le middleware suivant en cas de succès.
    // En cas d'échec, une erreur est lancée
    return (req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line no-useless-catch
        try{
            schema.parse(req.body);
            console.log("body" + req.body);
            next();
        }
        catch (error) {
            throw new Error(JSON.parse((error as ZodError).message)[0].message);
        }
    }
}