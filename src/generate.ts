import { AnySchema, ArraySchema, NumberSchema, ObjectSchema } from 'joi';
import { faker } from '@faker-js/faker';
import {
    MAX_LENGTH,
    MAX_NUMBER,
    MIN_LENGTH,
    MIN_NUMBER,
} from '@src/joi-mock.constants';

export const generateRandomNumber = ({
                                         min,
                                         max,
                                     }: {
    min?: number;
    max?: number;
}) => faker.datatype.number({ min: min || MIN_NUMBER, max: max || MAX_NUMBER });

function getMaxConstraint(schema: AnySchema): number | null {
    const max = schema['_rules'].filter((rule) => rule.name === 'max');
    if (max.length > 0) {
        return max[0].args.limit;
    }
    return null;
}

function getMinConstraint(schema: AnySchema): number | null {
    const min = schema['_rules'].filter((rule) => rule.name === 'min');
    if (min.length > 0) {
        return min[0].args.limit;
    }
    return null;
}

// Optional input
export const getLength = (lengthOptions?: { min?: number; max?: number }) => {
    const { min = MIN_LENGTH, max = MAX_LENGTH } = lengthOptions || {};
    return faker.datatype.number({ min, max });
};

export const generateRandomString = (schema: AnySchema) => {
    if(schema['_valids'] && schema['_valids']['_values']){
        // Select random value from valids
        const validValues = Array.from(schema['_valids']['_values']);
        return faker.helpers.arrayElement(validValues);
    }
    const length = getLength();
    return faker.lorem.word(length);
};

export const generatePrimitive = (schema: AnySchema) => {
    if (schema.type === 'number') {
        const numberSchema = schema as NumberSchema;
        return generateRandomNumber({
            min: getMinConstraint(numberSchema),
            max: getMaxConstraint(numberSchema),
        });
    } else if (schema.type === 'string') {
        return generateRandomString(schema);
    } else if (schema.type === 'boolean') {
        return faker.datatype.boolean();
    }else{
        return null;
    }
};

export const generateSchema = (schema: AnySchema) => {
    if (
        schema.type === 'string' ||
        schema.type === 'number' ||
        schema.type === 'boolean'
    ) {
        return generatePrimitive(schema);
    } else if (schema.type === 'object') {
        const objectSchema = schema as ObjectSchema;
        const retValue = {};
        objectSchema['_ids']['_byKey'].forEach((value, key) => {
            const { presence } = value.schema['_flags'];
            if (presence === 'required' || faker.datatype.boolean()) {
                retValue[key] = generateSchema(value.schema);
            }
        });
        return retValue;
    } else if (schema.type === 'array') {
        const arraySchema = schema as ArraySchema;
        const length = getLength({
            min: arraySchema._flags.min,
            max: arraySchema._flags.max,
        });
        const retArray = [];
        const { items } = arraySchema['$_terms'];
        if (items.length === 0) {
            return retArray;
        }
        for (let i = 0; i < length; i++) {
            retArray.push(generateSchema(items[i % items.length]));
        }
        return retArray;
    }else{
        return null;

    }
};