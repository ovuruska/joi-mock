import {AnySchema} from "joi";
import {generateSchema} from "@src/generate";

export class GenerateParams  {
    count : number ;
}

export class JoiMock {

    private schema: AnySchema;
    constructor(schema: AnySchema) {
        this.schema = schema;
    }

    generate(params :GenerateParams = {count: 1} ) {
        const response = [];
        const {count} = params;
        for (let i = 0; i < count; i++) {
            response.push(generateSchema(this.schema));
        }
        return response;
    }

}