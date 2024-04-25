import { Request, Response } from "express";
import { BlockService } from "../../../services/block.service";
import { BlockController } from "./block.controller";
import { GraphQLClient } from "../../../utils/graphqlClient";

const mockFetchLatestBlockNumber = jest.fn();
const mockRequest = jest.fn();

jest.mock("../../../services/block.service.ts", () => {
  return {
    BlockService: jest.fn().mockImplementation(() => {
      return { fetchLatestBlockNumber: mockFetchLatestBlockNumber };
    }),
  };
});

jest.mock("../../../utils/graphqlClient.ts", () => {
  return {
    GraphQLClient: jest.fn().mockImplementation(() => {
      return { request: mockRequest };
    }),
  };
});

describe("BlockController", () => {
  const mockRequest = jest.fn();
  const mockOriginalClient = { request: mockRequest } as any;
  it("gets the latest block number and responds with JSON", async () => {
    const blockNumber = 12345;
    mockFetchLatestBlockNumber.mockResolvedValueOnce(blockNumber);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const graphqlClient = new GraphQLClient(mockOriginalClient);
    const blockService = new BlockService(graphqlClient);
    const controller = new BlockController(blockService);

    await controller.getLatestBlockNumber(req, res);

    expect(res.json).toHaveBeenCalledWith({ latestBlockNumber: blockNumber });
  });

  it("handles errors by responding with a 500 status", async () => {
    const errorMessage = "Error fetching the latest block number";
    mockFetchLatestBlockNumber.mockRejectedValueOnce(new Error(errorMessage));

    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const graphqlClient = new GraphQLClient(mockOriginalClient);
    const blockService = new BlockService(graphqlClient);
    const controller = new BlockController(blockService);

    await controller.getLatestBlockNumber(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
