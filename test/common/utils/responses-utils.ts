import { INestApplication } from "@nestjs/common";
import { ErrorTypes } from "../../../src/common/enums/error-types.enum";
import { SuccessTypes } from "../../../src/common/enums/succes-types.enum";
import supertest, * as request from 'supertest';

export const requestFunction = async (
    app: INestApplication,
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    expectedStatus: number,
    body?: Record<string, any>,
): Promise<supertest.Test> => {
    const req = request(app.getHttpServer())[method](path)
    req.send(body);
    return req.expect(expectedStatus);
};

export const validateSuccessResponse = (response: any, statusCode: number, successType: SuccessTypes) => {
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('statusCode', statusCode);
    expect(response.body).toHaveProperty('successType', successType);
    expect(response.body).toHaveProperty('timestamp');
    if (response.body.data !== undefined) {
        expect(response.body).toHaveProperty('data');
    }
};

export const validateProductResponse = (data: object) => {
    expect(data).toMatchObject({
        id: expect.any(String),
        nombre: expect.any(String),
        precio: expect.any(String),
        stock: expect.any(String),
    });
};