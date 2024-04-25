import { Request, Response } from "express";
import { IBlockService } from "../../../types/block.type";

export class BlockController {
  private service: IBlockService;

  constructor(service: IBlockService) {
    this.service = service;
  }

  public async getLatestBlockNumber(_: Request, res: Response): Promise<void> {
    try {
      const latestBlockNumber = await this.service.fetchLatestBlockNumber();
      res.json({ latestBlockNumber });
    } catch (error) {
      res.status(500).json({ error: "Error fetching the latest block number" });
    }
  }
}
