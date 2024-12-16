import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import Controller from "../../../src/entrypoint/controller/Controller"
import BaseService from "../../../src/core/service/BaseService";
import ErrorResponse from "../../../src/config/ErrorResponse";

class MockService implements BaseService {
    async execute(params: any): Promise<any> {
        return { success: true, data: params };
    }
}

describe("Controller", () => {
    let mockService: MockService;
    let mockSchema: ObjectSchema;
    let controller: Controller<MockService>;

    beforeEach(() => {
        mockService = new MockService();
        mockSchema = Joi.object({
            name: Joi.string().required(),
        });
        controller = new Controller(mockService, mockSchema);
    });

    it("should validate request and execute service successfully", async () => {
        const req = {
            body: { name: "John Doe" },
            query: {},
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        const executeHandler = controller.execute(200) as any;

        await executeHandler(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            data: { request: { name: "John Doe" } },
        });
    });

    it("should throw error if required query parameters are missing", async () => {
        const req = {
            body: {},
            query: {},
        } as Request;

        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        const executeHandler = controller.execute(200, "id") as any;

        let error = null;

        try{
            await executeHandler(req, res, next);
        }catch(err){
            error = err;
        }

        expect(error).toStrictEqual(new ErrorResponse(422, "Missing query params", null));
    });

    it("should validate the request body and call validateRequest", async () => {
        const req = {
            body: { invalidField: "invalid" },
            query: {},
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        const next = jest.fn() as NextFunction;

        jest.spyOn(controller, "validateRequest");

        const executeHandler = controller.execute(200) as any;

        let error = null;

        try{
            await executeHandler(req, res, next);
        }catch(err){
            error = err;
        }

        expect(error).toStrictEqual(new ErrorResponse(422, "\"name\" is required", null));

        expect(controller.validateRequest).toHaveBeenCalledWith(mockSchema, req, res);
    });
});
