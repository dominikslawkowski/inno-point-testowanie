import { textAreaValidator, textEmailValidator } from "../validators";
import faker from 'faker';

describe("textAreaValidator tests", () => {
    test("Empty value", () => {
        const emptyValue = "";
        expect(textAreaValidator(emptyValue)).toBe(true);
    });

    test("Value is to long", () => {
        const value = faker.random.alphaNumeric(2000);
        expect(textAreaValidator(value)).toBe(true);
    });

    test("Value is incorrect", () => {
        const randomText = faker.random.alphaNumeric(983);
        const value = `@$#&^$<${randomText}?>"{}:}!`;
        expect(textAreaValidator(value)).toBe(true);
    });

    test("Value is an email", () => {
        const value = faker.internet.email();
        expect(textEmailValidator(value)).toBe(true);
    });
});