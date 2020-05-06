/**
 * @jest-environment node
 */

import * as Fake from "../_data_/fake.data";
import { ErrorMessages, Modes, DelayInterval } from "../../src/consts";
import FlexApi from "../../src";

describe("Fake mode", () => {
  describe("GET", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
            "/api/v1/users/1": Fake.getUserByIdHandler,
            "/api/v1/users?uid=0": Fake.getUserByIdHandler,
            "/api/v1/users?uid=0&uid=1": Fake.getUsersByIdsHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("Empty config obj", async () => {
      const resp = await api.get("/api/v1/users", {});
      expect(resp.data).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2],
      });
    });

    it("No config obj", async () => {
      const resp = await api.get("/api/v1/users");
      expect(resp.data).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1, Fake.data.userTest2],
      });
    });

    it("No handler & empty config obj", async () => {
      await expect(api.get("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.get("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("Simple params", async () => {
      const resp = await api.get("/api/v1/users", {
        params: { uid: "0" },
      });
      expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest0 });
    });

    it("Array params", async () => {
      const resp = await api.get("/api/v1/users", {
        params: { uid: ["0", "1"] },
      });
      expect(resp.data).toStrictEqual({
        users: [Fake.data.userTest0, Fake.data.userTest1],
      });
    });
  });

  describe("POST", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/register": Fake.registerUserHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With data", async () => {
      const resp = await api.post("/api/v1/users/register", {
        data: { ...Fake.data.userTest4 },
      });
      expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest4 });
    });

    it("No handler & empty config obj", async () => {
      await expect(api.post("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.post("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("PUT", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.registerUserHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With body", async () => {
      const resp = await api.put("/api/v1/users/4", {
        data: { ...Fake.data.userTest4 },
      });
      expect(resp.data).toStrictEqual({ userDetails: Fake.data.userTest4 });
    });

    it("No handler & empty config obj", async () => {
      await expect(api.put("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.put("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("PATCH", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/patchUser": Fake.patchUserInfoHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With body", async () => {
      const resp = await api.post("/api/v1/users/patchUser", {
        data: { lastname: "Test Patch", fullname: "Dev 4 Test Patch" },
      });
      expect(resp.data).toStrictEqual({
        userDetails: Fake.data.patchUserTest4,
      });
    });

    it("No handler & empty config obj", async () => {
      await expect(api.patch("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.patch("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("DELETE", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.deleteUserInfoHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With body", async () => {
      const resp = await api.delete("/api/v1/users/4", {
        data: { ...Fake.data.userTest4 },
      });
      expect(resp.data).toStrictEqual({ message: "Success" });
    });

    it("No handler & empty config obj", async () => {
      await expect(api.delete("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.delete("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("HEAD", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/status": Fake.statusUserHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With body", async () => {
      const resp = await api.head("/api/v1/users/status");
      expect(resp).toBeUndefined();
    });

    it("No handler & empty config obj", async () => {
      await expect(api.head("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.head("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });

  describe("OPTIONS", () => {
    // Applies only to tests in this describe block
    let api = null;
    let opts = null;
    beforeEach(() => {
      opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users/4": Fake.optionsHandler,
          },
        },
      };
      api = new FlexApi(opts);
    });

    afterEach(() => {
      api = null;
      opts = null;
    });

    it("With body", async () => {
      const resp = await api.options("/api/v1/users/4");
      expect(resp).toBeUndefined();
    });

    it("No handler & empty config obj", async () => {
      await expect(api.options("/api/v1/pathNotExisted", {})).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });

    it("No handler & null config obj", async () => {
      await expect(api.options("/api/v1/pathNotExisted")).rejects.toThrow(
        ErrorMessages.NO_HANDLER
      );
    });
  });
});
