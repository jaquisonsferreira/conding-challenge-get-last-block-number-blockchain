export interface IBlockService {
  fetchLatestBlockNumber(): Promise<number>;
}
