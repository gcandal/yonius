const assert = require("assert");
const yonius = require("../..");

const httpbinUrl = "https://httpbin.stage.hive.pt/";

describe("API", function() {
    describe("#constructor()", function() {
        it("should be able to contruct a new API instance", () => {
            const api = new yonius.API();
            assert.notStrictEqual(api, null);
            assert.notStrictEqual(api, undefined);
        });
    });
    describe("#get()", function() {
        it("should be able to run a simple get", async () => {
            let result;
            const api = new yonius.API();

            result = await api.get(httpbinUrl + "ip");
            assert.notStrictEqual(result.origin, null);
            assert.notStrictEqual(result.origin, undefined);

            result = await api.get(httpbinUrl + "get", {
                params: { hello: "world" }
            });
            assert.deepStrictEqual(result.args, { hello: "world" });

            result = await api.get(httpbinUrl + "get", {
                params: { hello: "world" },
                headers: { hello: "world" }
            });
            assert.deepStrictEqual(result.args, { hello: "world" });
            assert.strictEqual(result.headers.Hello, "world");
        });
    });
    describe("#post()", function() {
        it("should be able to run a simple post", async () => {
            let result;
            const api = new yonius.API();

            result = await api.post(httpbinUrl + "post", {
                params: { hello: "world" }
            });
            assert.deepStrictEqual(result.form, { hello: "world" });

            result = await api.post(httpbinUrl + "post", { data: "hello world" });
            assert.strictEqual(result.data, "hello world");

            result = await api.post(httpbinUrl + "post", {
                dataJ: { hello: "world" }
            });
            assert.deepStrictEqual(result.json, { hello: "world" });
        });
    });
});
