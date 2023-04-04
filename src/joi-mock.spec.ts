import {JoiMock} from "@src/joi-mock";
import Joi from "joi";

describe('JoiMock', () => {
    it('should be imported correctly.', () => {
        expect(JoiMock).toBeDefined();
    });

    it('should be constructed as expected.', () => {
        const joiMock = new JoiMock(Joi.number());
        expect(joiMock).toBeDefined();
    });
    it('should generate a random number.', () => {
        const joiMock = new JoiMock(Joi.number());
        const result = joiMock.generate();
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result[0]).toBeDefined();
        expect(typeof result[0]).toBe('number');
    });
    it('should generate multiple numbers.', () => {
        const joiMock = new JoiMock(Joi.number());
        const result = joiMock.generate({
            count: 10
        });
        expect(result).toBeDefined();
        expect(result.length).toBe(10);
    });
});