import { DELAY } from "./constants";

const defaultFakeOpts = {
  fake: {
    delay: DELAY,
    endpoints: [],
    errorHandler: null,
  },
};

const defaultMixOpts = {
  fake: {
    delay: DELAY,
    endpoints: [],
    errorHandler: null,
  },
};

const defaultAxiosOpts = {
  // eslint-disable-next-line handle-callback-err
  errorHandler: (error, message) => {
    throw new Error(message);
  },
};

export { defaultFakeOpts, defaultMixOpts, defaultAxiosOpts };
