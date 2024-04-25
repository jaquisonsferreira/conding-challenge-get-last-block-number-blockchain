import express from "express";
import { BlockService } from "./services/block.service";
import { BlockController } from "./infra/http/controllers/block.controller";
import { GraphQLClient } from "./utils/graphqlClient";
import { getEnv } from "./config/environments";
import { GraphQLClient as OriginalClient } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const graphqlEndpoint = getEnv("SUBGRAPH_URL");
const originalClient = new OriginalClient(graphqlEndpoint);
const graphqlClient = new GraphQLClient(originalClient);
const blockService = new BlockService(graphqlClient);
const blockController = new BlockController(blockService);

app.get("/api/latest-block-number", (req, res) =>
  blockController.getLatestBlockNumber(req, res)
);

app.get("/", (req, res) => {
  res.send({
    health: "ok",
  });
});

export default app;
