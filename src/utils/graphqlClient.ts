import { GraphQLClient as OriginalClient } from "graphql-request";
import { IGraphQLClient } from "../types/graphQL.type";

export class GraphQLClient implements IGraphQLClient {
  private client: OriginalClient;

  constructor(client: OriginalClient) {
    this.client = client;
  }

  public async request<T>(
    query: string,
    variables?: { [key: string]: any }
  ): Promise<T> {
    return this.client.request<T>(query, variables);
  }
}
