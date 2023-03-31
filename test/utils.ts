import {AnySchema} from "joi";
import {generate} from '@src/generate';

export const testSchema = (schema: AnySchema) => {
    for (let i = 0; i < 20; i++) {
        const {error} = schema.validate(generate(schema));
        expect(error).toBeUndefined();
    }
}