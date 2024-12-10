import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { logger } from '../../config/AppLogger';
import ErrorResponse from '../../config/ErrorResponse';

export default abstract class BaseController {
    public validateRequest = (schema: ObjectSchema, req: Request, res: Response) => {
        const result = schema.validate(req.body);

        if (result.error) {
            logger.error(result.error, "Erro 422 para o usuario")
            throw new ErrorResponse(422, result.error.message, null);
        }
    }
}