import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the WeAgent-MMGenEdit project homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /WeAgent-MMGenEdit/);
  assert.match(html, /A Full-Stack Recipe for Multimodal Agentic Image Generation and Editing/);
  assert.match(html, /23K/);
  assert.match(html, /14\.7K/);
  assert.match(html, /WeBench-MMGenEdit/);
  assert.match(html, /chart_at_a_glance\.webp/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("ships the paper figures and removes the temporary preview", async () => {
  const projectRoot = new URL("../", import.meta.url);
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /\/images\/harness\.webp/);
  assert.match(page, /\/images\/benchmark\.webp/);
  assert.match(page, /ShowcaseGallery/);

  await Promise.all([
    access(new URL("public/images/teaser.webp", projectRoot)),
    access(new URL("public/images/data_pipeline.webp", projectRoot)),
    access(new URL("public/images/Visualization.webp", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
  ]);

  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", projectRoot)));
});
