import {AnySchema} from "joi";
import {generateSchema} from '@src/generate';

export const testSchema = (schema: AnySchema) => {
    for (let i = 0; i < 20; i++) {
        const value = generateSchema(schema);
        const {error} = schema.validate(value);
        expect(error).toBeUndefined();
    }
}