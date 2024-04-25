import { getEnv } from "./environments";

describe("getEnv", () => {
  afterEach(() => {
    delete process.env.TEST_VAR;
  });

  it("should return the value of an environment variable when it is set", () => {
    process.env.TEST_VAR = "test-value";
    expect(getEnv("TEST_VAR")).toEqual("test-value");
  });

  it("should throw an error if the environment variable is not set", () => {
    delete process.env.TEST_VAR;
    expect(() => getEnv("TEST_VAR")).toThrow(Error);
    expect(() => getEnv("TEST_VAR")).toThrow(
      "Missing environment variable: TEST_VAR"
    );
  });
});
