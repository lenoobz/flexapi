import processURL from "../../src/utils";

describe("Url Utility", () => {
  const baseUrl = "https://example.com/api/v1";

  it("Empty config obj", () => {
    const url = processURL(baseUrl, {});
    expect(url).toEqual(baseUrl);
  });

  it("Null config obj", () => {
    const url = processURL(baseUrl);
    expect(url).toEqual(baseUrl);
  });

  it("Simple params obj", () => {
    const url = processURL(baseUrl, {
      params: { uid: 0 },
    });
    expect(url).toEqual(`${baseUrl}?uid=0`);
  });

  it("Complex params obj", () => {
    const url = processURL(baseUrl, {
      params: { uid: 0, sortby: "asc", filterby: 'type="fake"' },
    });
    expect(url).toEqual(
      `${baseUrl}?uid=0&sortby=asc&filterby=type%3D%22fake%22`
    );
  });

  it("Params with array", () => {
    const url = processURL(baseUrl, {
      params: { uid: [0, 1, 2] },
    });
    expect(url).toEqual(`${baseUrl}?uid=0&uid=1&uid=2`);
  });
});
