import app from "./app";
import { getEnv } from "./config/environments";

jest.mock("./app", () => ({
  listen: jest.fn(),
}));

jest.mock("./config/environments", () => ({
  getEnv: jest.fn(),
}));

describe("Server Initialization", () => {
  it("should start server on port from environment", () => {
    const testPort = "3000";
    (getEnv as jest.Mock).mockReturnValue(testPort);

    require("./server");

    expect(getEnv).toHaveBeenCalledWith("PORT");
    expect(app.listen).toHaveBeenCalledWith(testPort, expect.any(Function));
  });
});
