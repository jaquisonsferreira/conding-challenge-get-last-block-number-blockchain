import { GraphQLClient } from "./graphqlClient";

describe("GraphQLClient", () => {
  it("should forward calls to the original GraphQL client", async () => {
    const mockRequest = jest.fn();
    const mockOriginalClient = { request: mockRequest } as any;
    const client = new GraphQLClient(mockOriginalClient);

    const query = `query { getUser(id: "1") { name } }`;
    const variables = { id: "1" };
    await client.request(query, variables);

    expect(mockRequest).toHaveBeenCalledWith(query, variables);
  });
});
