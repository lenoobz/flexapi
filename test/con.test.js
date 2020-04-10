import FlexApi, { Modes, DelayInterval } from "..";
import * as Fake from "./mock-data/fake.data";
import { ErrorMessages, Clients } from "../src/consts";

describe("Constructors test suite", () => {
  describe("Fake constructor", () => {
    it("Fake invalid endpoints", () => {
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

    it("Fake invalid fake object", () => {
      const opts = {
        mode: Modes.FAKE,
        fake: null,
      };

      expect(() => new FlexApi(opts)).toThrow(
        ErrorMessages.INVALID_FAKE_CONFIG
      );
    });
  });

  describe("Mix constructor", () => {
    it("Mix invalid fake object", () => {
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

    it("Mix invalid fake endpoint", () => {
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

    it("Mix invalid real object", () => {
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

  describe("Real constructor", () => {
    it("Real invalid real object", () => {
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

    it("Real invalid real client", () => {
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

    it("Real not implemented real client", () => {
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

  it("No mode", () => {
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
