import { test } from "node:test";
import * as assert from "node:assert";
import Fastify from "fastify";
import { MockEmbeddingGenerator } from "../../helper.js";
import liveness from "../../../src/routes/status/liveness.js";

test("/status/liveness should always response 200", async (t) => {
    const fastify = Fastify();
    const es = new MockEmbeddingGenerator();
    fastify.decorate("embeddingGenerator", es);

    fastify.register(liveness);

    // before fastify.ready()
    let res = await fastify.inject({
        url: "/liveness"
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(
        res.headers["content-type"],
        "application/json; charset=utf-8"
    );
    const resData = JSON.parse(res.payload);
    assert.equal(resData.status, true);

    await fastify.ready();

    // after fastify.ready()
    res = await fastify.inject({
        url: "/liveness"
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(
        res.headers["content-type"],
        "application/json; charset=utf-8"
    );
    assert.equal(JSON.parse(res.payload).status, true);

    (fastify.embeddingGenerator as any).setReady(false);

    // after embeddingGenerator.isReady = false
    res = await fastify.inject({
        url: "/liveness"
    });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(
        res.headers["content-type"],
        "application/json; charset=utf-8"
    );
    assert.equal(JSON.parse(res.payload).status, true);
});
