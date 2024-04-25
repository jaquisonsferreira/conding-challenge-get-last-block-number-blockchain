export interface IGraphQLClient {
  request<T = any>(
    query: string,
    variables?: { [key: string]: any }
  ): Promise<T>;
}
