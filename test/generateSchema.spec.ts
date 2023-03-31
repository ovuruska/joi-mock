import Joi from 'joi';
import {testSchema} from '@test/utils';



describe('Generate schema', () => {
    it('should generate random number.', () => {
        testSchema(Joi.number());
    });
    it('should generate random number with min constraint.', () => {
        testSchema(
            Joi.number().min(10)
        );
    })
    it('should generate random number with max constraint.', () => {
        testSchema(
            Joi.number().max(10)
        )
    });
    it('should generate random number with min and max constraint.', () => {
        const schema = Joi.number().min(10).max(20);
        testSchema(schema);
    });

    it('should generate a random string', () => {
        const schema = Joi.string();
        testSchema(schema);
    });



    it('should generate a random boolean.', () => {
        const schema = Joi.boolean();
        testSchema(schema);
    });

    it('should generate an empty object', () => {
        const schema = Joi.object({
        });
        testSchema(schema);
    });

    it('should generate object with a key.',() => {
        const schema = Joi.object({
            key: Joi.string(),
            name: Joi.boolean(),
            keyNumber: Joi.number().max(1)
        });
        testSchema(schema);
    });
    it('should generate an object with single nested object', () => {
        const schema = Joi.object({
            key: Joi.string(),
            name: Joi.boolean(),
            keyNumber: Joi.number().max(1),
            nested: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
            }),
        });
        testSchema(schema);
    });

    it('should generate an object with multiple nested object', () => {
        const schema = Joi.object({
            key: Joi.string(),
            name: Joi.boolean(),
            keyNumber: Joi.number().max(1),
            nested: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
            }),
            nested2: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
            })
        });
        testSchema(schema)
    });

    it('should generate an object with multiple nested object with depth more than 2.', () => {
        const schema = Joi.object({
            key: Joi.string(),
            name: Joi.boolean(),
            keyNumber: Joi.number().max(1),
            nested: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
                nested: Joi.object({
                    nestedKey: Joi.string(),
                    nestedName: Joi.boolean(),
                    nested: Joi.object({
                        nestedKey: Joi.string(),
                        nestedName: Joi.boolean(),
                        nested: Joi.object({
                            nestedKey: Joi.string(),
                        })
                    })
                })

            }),
            nested2: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
                nested: Joi.object({
                    nestedKey: Joi.string(),
                    nestedName: Joi.boolean(),
                    nested: Joi.object({
                        nestedKey: Joi.string(),
                        nestedName: Joi.boolean(),
                        nested: Joi.object({
                            nestedKey: Joi.string(),
                        })
                    })
                })
            })
        });
        testSchema(schema);

    });

    it('should generate an empty array',() => {
        const schema = Joi.array();
        testSchema(schema);
    });

    it('should generate an array of strings.',() => {
        const schema = Joi.array().items(Joi.string());
        testSchema(schema);
    });
    it('should generate an array of numbers.',() => {
        const schema = Joi.array().items(Joi.number());
        testSchema(schema);
    });

    it('should generate an array of booleans.',() => {
        const schema = Joi.array().items(Joi.boolean());
        testSchema(schema);
    });

    it( 'should generate an array of objects.',() => {
        const schema = Joi.array().items(Joi.object({
            key: Joi.string(),
            valid: Joi.boolean(),
            keyNumber: Joi.number().max(1),
        }));
        testSchema(schema);
    });

    it('should generate an array of objects with nested objects with depth more than 2.',() => {
        const schema = Joi.array().items(Joi.object({
            key: Joi.string(),
            valid: Joi.boolean(),
            keyNumber: Joi.number().max(1),
            nested: Joi.object({
                nestedKey: Joi.string(),
                nestedName: Joi.boolean(),
                nested: Joi.object({
                    nestedKey: Joi.string(),
                    nestedName: Joi.boolean(),

                })
            })
        }));
        testSchema(schema);
    });

    it('should generate optional object with empty fields.',() => {
        const schema = Joi.object({
            key: Joi.string().optional(),
            valid: Joi.boolean().optional(),
        });
        testSchema(schema);
    });

    it('should generate unique array of strings.',() => {
        const schema = Joi.array().items(Joi.string()).unique();
        testSchema(schema);
    });

    it('should generate unique array of numbers.',() => {
        const schema = Joi.array().items(Joi.number()).unique();
        testSchema(schema);
    });

    it('should generate unique array of booleans.',() => {
        const schema = Joi.array().items(Joi.boolean()).unique();
        testSchema(schema);
    });


    it('should generate conditional fields ',() => {
       const  schema = Joi.object({
           john: Joi.string().allow(null),
           john1: Joi.when('john', {
               is: Joi.exist().not(null),
               then: Joi.string().allow(null),
               otherwise: Joi.forbidden(),
           }),
           john2: Joi.when('john1', {
               is: Joi.exist().not(null),
               then: Joi.string().allow(null),
               otherwise: Joi.forbidden(),
           }),
           john3: Joi.when('john2', {
               is: Joi.exist().not(null),
               then: Joi.string().allow(null),
               otherwise: Joi.forbidden(),
           }),
       });
        testSchema(schema);
    });

});