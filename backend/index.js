require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MeiliSearch } = require("meilisearch");
const app = express();

const client = new MeiliSearch({
  host: process.env.MEILI_HOST || "http://localhost:7700",
  apiKey: process.env.MEILI_API_KEY || "masterKey",
});

app.use(cors());

app.get("/", function (req, res) {
  return res.send("Tenant Token demo");
});

app.get("/create-tenant-token", async (req, res) => {
  const { value: userName } = req.query;

  /* Add functionality to create Tenant token */
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Checking for an API Key");
  const { results } = await client.getKeys();
  const apiKeyList = results.filter((res) => res.description === "SEARCH");

  if (apiKeyList.length === 0) {
    await client.createKey({
      description: "SEARCH",
      actions: ["search"],
      indexes: ["tenant_token"],
      expiresAt: "2025-01-01T00:00:00Z",
    });
    console.log("Created API Key");
  }

  console.log(`Server started at PORT: ${port}`);
});
