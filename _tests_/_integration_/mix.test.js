/**
 * @jest-environment node
 */

import axios from "axios";
import qs from "qs";
import * as Fake from "../_data_/fake.data";
import { Clients, Modes, DelayInterval } from "../../src/consts";
import FlexApi from "../../src";

describe("Mix mode", () => {
  let api;
  const users = [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2];
  const baseURL = "https://flexapi-mock-server.herokuapp.com";
  // const baseURL = "http://localhost:5000";

  beforeAll(async () => {
    const opts = {
      mode: Modes.REAL,
      real: {
        client: Clients.AXIOS,
        instance: axios,
        config: {
          axios: {
            baseURL: baseURL,
          },
        },
      },
    };
    api = new FlexApi(opts);

    // Populate data
    for (let i = 0; i < users.length; i++) {
      await api.post("/api/v1/users/register", {
        data: { ...users[i] },
      });
    }
  });

  afterAll(async () => {
    // Clean up data
    for (let i = 0; i < users.length; i++) {
      await api.delete(`/api/v1/users/${i}`);
    }
  });

  describe("Axios agent", () => {
    describe("GET", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;

      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users": Fake.getAllUsersHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };

        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Empty config obj", async () => {
        const resp = await itApi.get("/api/v1/users", {});
        expect(resp.data).toStrictEqual({
          users: [
            Fake.data.userTest0,
            Fake.data.userTest1,
            Fake.data.userTest2,
          ],
        });
      });

      it("No config obj", async () => {
        const resp = await itApi.get("/api/v1/users");
        expect(resp.data).toStrictEqual({
          users: [
            Fake.data.userTest0,
            Fake.data.userTest1,
            Fake.data.userTest2,
          ],
        });
      });

      it("No handler & empty config obj", async () => {
        await expect(itApi.get("/api/v1/pathNotExisted", {})).rejects.toThrow(
          "Error occurred while making a GET request"
        );
      });

      it("No handler & no config obj", async () => {
        await expect(itApi.get("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a GET request"
        );
      });

      it("With params", async () => {
        const resp = await itApi.get("/api/v1/users-filter", {
          params: { uid: "0" },
        });
        expect(resp.data).toStrictEqual({ users: [Fake.data.userTest0] });
      }, 15000);

      it("With array params", async () => {
        const resp = await itApi.get("/api/v1/users-filter", {
          params: { uid: [0, 1] },
        });
        expect(resp.data).toStrictEqual({
          users: [Fake.data.userTest0, Fake.data.userTest1],
        });
      }, 15000);
    });

    describe("POST", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;

      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/setrole": Fake.setUserRoleHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.post("/api/v1/users/register", {
          data: { ...Fake.data.userTest4 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest4 });
      }, 15000);

      it("Fake set user role", async () => {
        const resp = await itApi.post("/api/v1/users/setrole", {
          data: { ...Fake.data.userTest4 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest4 });
      }, 15000);

      it("No handler & empty config obj", async () => {
        await expect(itApi.post("/api/v1/pathNotExisted", {})).rejects.toThrow(
          "Error occurred while making a POST request"
        );
      });

      it("No handler & no config obj", async () => {
        await expect(itApi.post("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a POST request"
        );
      });
    });

    describe("PUT", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;

      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/0": Fake.getUserByIdHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.put("/api/v1/users/2", {
          data: { ...Fake.data.userTest2 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest2 });
      }, 15000);

      it("Fake set user role", async () => {
        const resp = await itApi.put("/api/v1/users/0", {
          data: { ...Fake.data.userTest0 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest0 });
      }, 15000);

      it("No handler & empty config obj", async () => {
        await expect(itApi.put("/api/v1/pathNotExisted", {})).rejects.toThrow(
          "Error occurred while making a PUT request"
        );
      });

      it("No handler & no config object", async () => {
        await expect(itApi.put("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a PUT request"
        );
      });
    });

    describe("PATCH", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;
      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/patchUser": Fake.patchUserInfoHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.patch("/api/v1/users/1", {
          data: { ...Fake.data.userTest4 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest4 });
      }, 15000);

      it("Fake set user role", async () => {
        const resp = await itApi.patch("/api/v1/users/patchUser", {
          data: { lastname: "Test Patch", fullname: "Dev 4 Test Patch" },
        });
        expect(resp.data).toStrictEqual({
          userDetails: Fake.data.patchUserTest4,
        });
      }, 15000);

      it("No handler & empty config obj", async () => {
        await expect(itApi.patch("/api/v1/pathNotExisted", {})).rejects.toThrow(
          "Error occurred while making a PATCH request"
        );
      });

      it("No handler & no config obj", async () => {
        await expect(itApi.patch("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a PATCH request"
        );
      });
    });

    describe("DELETE", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;

      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/4": Fake.deleteUserInfoHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.delete("/api/v1/users/1");
        expect(resp.data).toStrictEqual({ message: "Success" });
      }, 15000);

      it("Real register user", async () => {
        const resp = await itApi.post("/api/v1/users/register", {
          data: { ...Fake.data.userTest1 },
        });
        expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest1 });
      }, 15000);

      it("Fake delete user", async () => {
        const resp = await itApi.delete("/api/v1/users/4");
        expect(resp.data).toStrictEqual({ message: "Success" });
      }, 15000);

      it("No handler & empty config obj", async () => {
        await expect(
          itApi.delete("/api/v1/pathNotExisted", {})
        ).rejects.toThrow("Error occurred while making a DELETE request");
      });

      it("No handler & no config obj", async () => {
        await expect(itApi.delete("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a DELETE request"
        );
      });
    });

    describe("HEAD", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;
      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/statusFake": Fake.statusUserHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.head("/api/v1/users/status");
        expect(resp.headers).toHaveProperty("content-length");
      }, 15000);

      it("Fake set user role", async () => {
        const resp = await itApi.head("/api/v1/users/statusFake");
        expect(resp).toBeUndefined();
      }, 15000);

      it("No handlers & empty config obj", async () => {
        await expect(itApi.head("/api/v1/pathNotExisted", {})).rejects.toThrow(
          "Error occurred while making a HEAD request"
        );
      });

      it("No handlers & no config obj", async () => {
        await expect(itApi.head("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making a HEAD request"
        );
      });
    });

    describe("OPTIONS", () => {
      // Applies only to tests in this describe block
      let itApi = null;
      let itOpts = null;
      beforeEach(() => {
        itOpts = {
          mode: Modes.MIX,
          fake: {
            delay: DelayInterval,
            endpoints: {
              "/api/v1/users/4": Fake.optionsHandler,
            },
          },
          real: {
            client: Clients.AXIOS,
            instance: axios,
            config: {
              axios: {
                baseURL: baseURL,
                paramsSerializer: (params) =>
                  qs.stringify(params, { arrayFormat: "repeat" }),
              },
            },
          },
        };
        itApi = new FlexApi(itOpts);
      });

      afterEach(() => {
        itApi = null;
        itOpts = null;
      });

      it("Real register user", async () => {
        const resp = await itApi.options("/api/v1/users/2");
        expect(resp.headers).toHaveProperty("access-control-allow-headers");
      }, 15000);

      it("Fake set user role", async () => {
        const resp = await itApi.options("/api/v1/users/4");
        expect(resp).toBeUndefined();
      }, 15000);

      it("No handler & empty config obj", async () => {
        await expect(
          itApi.options("/api/v1/pathNotExisted", {})
        ).rejects.toThrow("Error occurred while making OPTIONS request");
      });

      it("No handler & no config obj", async () => {
        await expect(itApi.options("/api/v1/pathNotExisted")).rejects.toThrow(
          "Error occurred while making OPTIONS request"
        );
      });
    });
  });
});
