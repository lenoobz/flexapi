const Modes = {
  FAKE: "fake",
  REAL: "real",
  MIX: "mix",
};

const Clients = {
  AXIOS: "axios",
  FETCH: "fetch",
  AJAX: "ajax",
};

const Verbs = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  HEAD: "head",
  OPTIONS: "options",
  DELETE: "delete",
};

const DelayInterval = 50;

const ErrorMessages = {
  NO_CLIENT: "No client available",
  NO_HANDLER: "No handler provided",
  NO_IMPLEMENT: "Not yet implemented",
  INVALID_MODE: "Invalid mode",
  INVALID_CONFIG: "Invalid config",
  INVALID_FAKE_CONFIG: "Invalid fake config",
  INVALID_REAL_CONFIG: "Invalid real config",
  INVALID_AXIOS_CONFIG: "Invalid axios config",
  POST: "Error occurred while making a POST request",
  GET: "Error occurred while making a GET request",
  PATCH: "Error occurred while making a PATCH request",
  PUT: "Error occurred while making a PUT request",
  DELETE: "Error occurred while making a DELETE request",
  HEAD: "Error occurred while making a HEAD request",
  OPTIONS: "Error occurred while making OPTIONS request",
};

const FakeOpts = {
  fake: {
    delay: DelayInterval,
    endpoints: [],
    errorHandler: null,
  },
};

const MixOpts = {
  fake: {
    delay: DelayInterval,
    endpoints: [],
    errorHandler: null,
  },
};

const AxiosDefault = {
  // eslint-disable-next-line handle-callback-err
  errorHandler: (error, message) => {
    throw new Error(message);
  },
};

export {
  Modes,
  Clients,
  Verbs,
  DelayInterval,
  ErrorMessages,
  FakeOpts,
  MixOpts,
  AxiosDefault,
};
