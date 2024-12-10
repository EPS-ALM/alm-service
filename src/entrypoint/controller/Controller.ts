import { ObjectSchema } from "joi";
import BaseController from "./BaseController";
import { Request, Response, NextFunction } from 'express';
import BaseService from "../../core/service/BaseService";
import ErrorResponse from "../../config/ErrorResponse";
import { logger } from "../../config/AppLogger";

export default class Controller<
    Service extends BaseService
> extends BaseController {
    public constructor(private readonly service: Service, private readonly schema?: ObjectSchema<any>) { super(); };

    public execute = (statusCode: number, ...args: string[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const params: { [key: string]: string | number | Object | undefined } = {};

            args.forEach(param => {
                params[param] = req.query[param] as string;
            });

            if (Object.keys(req.body).length != 0 && this.schema) {
                this.validateRequest(this.schema, req, res);
                const userRequest: Object = req.body;
                params['request'] = userRequest;
            }

            if (Object.values(params).every(value => value !== undefined) || Object.keys(params).length === 0) {
                const response = await this.service.execute(params);
                res.status(statusCode).send(response);
            } else {
                logger.error("Erro 422 para o usuario faltando parametros")
                console.log("params -> ", params)
                throw new ErrorResponse(422, "Missing query params", null);
            }
        }
    }
}