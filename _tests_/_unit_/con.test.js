import * as Fake from "../_data_/fake.data";
import { ErrorMessages, Clients, Modes, DelayInterval } from "../../src/consts";
import FlexApi from "../../src";

describe("Constructors", () => {
  describe("Fake", () => {
    it("Invalid endpoints", () => {
      const opts = {
        mode: Modes.FAKE,
        fake: {
          delay: DelayInterval,
          endpoints: null,
        },
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_FAKE_CONFIG
      );
    });

    it("Invalid fake obj", () => {
      const opts = {
        mode: Modes.FAKE,
        fake: null,
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_FAKE_CONFIG
      );
    });
  });

  describe("Mix", () => {
    it("Invalid fake obj", () => {
      const opts = {
        mode: Modes.MIX,
        fake: null,
        real: {
          client: Clients.AXIOS,
          axios: {},
        },
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_FAKE_CONFIG
      );
    });

    it("Invalid fake endpoint", () => {
      const opts = {
        mode: Modes.MIX,
        fake: {
          delay: DelayInterval,
          endpoints: null,
        },
        real: {
          client: Clients.AXIOS,
          axios: {},
        },
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_FAKE_CONFIG
      );
    });

    it("Invalid real obj", () => {
      const opts = {
        mode: Modes.MIX,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
          },
        },
        real: null,
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_REAL_CONFIG
      );
    });
  });

  describe("Real", () => {
    it("Invalid real obj", () => {
      const opts = {
        mode: Modes.REAL,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
          },
        },
        real: null,
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_REAL_CONFIG
      );
    });

    it("Invalid real client", () => {
      const opts = {
        mode: Modes.REAL,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
          },
        },
        real: {
          axios: {},
        },
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_REAL_CONFIG
      );
    });

    it("No implemented agent", () => {
      const opts = {
        mode: Modes.REAL,
        fake: {
          delay: DelayInterval,
          endpoints: {
            "/api/v1/users": Fake.getAllUsersHandler,
          },
        },
        real: {
          client: Clients.FETCH,
          axios: {},
        },
      };

      expect(() => new FlexApi(opts)).toThrow(ErrorMessages.NO_IMPLEMENT);
    });
  });

  it("No mode", () => {
    const opts = {
      fake: {
        delay: DelayInterval,
        endpoints: {
          "/api/v1/users": Fake.getAllUsersHandler,
        },
      },
      real: {
        client: Clients.AXIOS,
        axios: {},
      },
    };

    expect(() => new FlexApi(opts)).toThrow(ErrorMessages.INVALID_CONFIG);
  });

  it("No supported mode", () => {
    const opts = {
      mode: "not_support_mode",
      fake: {
        delay: DelayInterval,
        endpoints: {
          "/api/v1/users": Fake.getAllUsersHandler,
        },
      },
      real: {
        client: Clients.AXIOS,
        axios: {},
      },
    };

    expect(() => new FlexApi(opts)).toThrow(ErrorMessages.INVALID_MODE);
  });
});
