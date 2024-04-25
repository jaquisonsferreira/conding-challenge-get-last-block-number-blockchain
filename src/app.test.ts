jest.mock("./utils/graphqlClient.ts", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockResolvedValueOnce({
      blocks: [{ number: "12345" }],
    }),
  })),
}));

jest.mock("./config/environments.ts", () => ({
  getEnv: jest.fn().mockImplementation((key: "PORT" | "SUBGRAPH_URL") => {
    const envs = {
      PORT: "3000",
      SUBGRAPH_URL: "http://localhost:8080",
    };
    return envs[key];
  }),
}));

import request from "supertest";
import app from "./app";

describe("Express Application", () => {
  it("responds to the root path with health status", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ health: "ok" });
  });

  it("responds to /api/latest-block-number correctly", async () => {
    const response = await request(app).get("/api/latest-block-number");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ latestBlockNumber: 12345 });
  });
});
