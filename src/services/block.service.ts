import { IBlockService } from "../types/block.type";
import { IGraphQLClient } from "../types/graphQL.type";
import { getCache, setCache } from "../utils/cache";

export class BlockService implements IBlockService {
  private client: IGraphQLClient;
  private readonly cacheKey = "latestBlockNumber";

  constructor(client: IGraphQLClient) {
    this.client = client;
  }

  public async fetchLatestBlockNumber(): Promise<number> {
    const cachedValue = getCache(this.cacheKey);

    if (cachedValue) {
      return cachedValue as number;
    }

    const query = `query Blocks($first: Int, $orderBy: Block_orderBy, $orderDirection: OrderDirection) {
      blocks(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
        number
      }
    }`;

    const variables = {
      first: 1,
      orderBy: "number",
      orderDirection: "desc",
    };

    const data = await this.client.request<{ blocks: { number: string }[] }>(
      query,
      variables
    );

    const latestBlockNumber = parseInt(data.blocks[0].number, 10);

    setCache(this.cacheKey, latestBlockNumber);

    return latestBlockNumber;
  }
}
