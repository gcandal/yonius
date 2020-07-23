const assert = require("assert");
const yonius = require("../..");
const mock = require("./mock");

describe("Model", function() {
    this.timeout(30000);
    describe("#fill()", function() {
        it("should be able to run simple fill operations", () => {
            const person = mock.Person.niw();
            assert.deepStrictEqual(person.identifier, undefined);
            assert.deepStrictEqual(person.identifierSafe, undefined);
            assert.deepStrictEqual(person.name, "dummy");
            assert.deepStrictEqual(person.age, null);
            assert.deepStrictEqual(person.info, null);
        });
    });
});

describe("ModelStore", function() {
    this.timeout(30000);
    describe("#save()", function() {
        it("should be able to save simple entities", async () => {
            const person = new mock.Person();
            await person.save();
        });
    });
});

describe("#typeD()", function() {
    it("should handle basic coercing", async () => {
        let result;

        result = yonius.typeD("int");
        assert.strictEqual(result, null);

        result = yonius.typeD("list");
        assert.deepStrictEqual(result, []);

        result = yonius.typeD("dict");
        assert.deepStrictEqual(result, {});

        result = yonius.typeD("object");
        assert.deepStrictEqual(result, {});

        result = yonius.typeD("custom", "hello");
        assert.deepStrictEqual(result, "hello");
    });
});
