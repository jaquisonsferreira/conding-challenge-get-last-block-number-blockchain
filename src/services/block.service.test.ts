import { getCache } from "../utils/cache";
import { GraphQLClient } from "../utils/graphqlClient";
import { BlockService } from "./block.service";

jest.mock("../utils/cache", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));

jest.mock("../utils/graphqlClient", () => {
  const mockRequest = jest.fn();
  mockRequest.mockResolvedValueOnce({ blocks: [{ number: "12345" }] });
  return {
    GraphQLClient: jest.fn().mockImplementation(() => ({
      request: mockRequest,
    })),
  };
});

describe("BlockService", () => {
  let graphqlClient: GraphQLClient;
  let service: BlockService;
  let mockRequest: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    graphqlClient = new (require("../utils/graphqlClient").GraphQLClient)();
    service = new BlockService(graphqlClient);
    mockRequest = graphqlClient.request as any;
  });

  it("fetches the latest block number", async () => {
    const result = await service.fetchLatestBlockNumber();
    expect(result).toEqual(12345);
    expect(mockRequest).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    );
  });

  it("fetches the latest block number from the cache if available", async () => {
    const blockNumber = 12345;
    (getCache as jest.Mock).mockReturnValueOnce(blockNumber);

    const result = await service.fetchLatestBlockNumber();

    expect(result).toEqual(12345);
    expect(getCache).toHaveBeenCalledWith("latestBlockNumber");
    expect(mockRequest).not.toHaveBeenCalled();
  });
});
