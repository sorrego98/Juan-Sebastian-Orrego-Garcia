import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { requestFunction, validateProductResponse, validateSuccessResponse } from "../common/utils/responses-utils";
import { SuccessTypes } from "../../src/common/enums/succes-types.enum";

describe('PP_Payments Integration', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('GET /products', () => {
        it('Debería devolver los productos existentes', async () => {
            const response = await requestFunction(app, 'get', '/productos', 200, );

            validateSuccessResponse(response, 200, SuccessTypes.GOOD_REQUEST);
            expect(Array.isArray(response.body.data)).toBe(true);

            const data = response.body.data;

            data.forEach((item: Object) => validateProductResponse(item));
        });
    });
    
});