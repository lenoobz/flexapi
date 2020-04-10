import { ErrorMessages, Modes, Clients, DelayInterval } from "./consts";
import FakeClient from "./clients/fake";
import MixClient from "./clients/mix";
import RealClient from "./clients/real";

function FlexApi(opts) {
  const { mode } = opts;

  if (!mode) {
    throw new Error(ErrorMessages.INVALID_CONFIG);
  }

  switch (mode) {
    case Modes.FAKE:
      this.client = new FakeClient(opts);
      break;
    case Modes.MIX:
      this.client = new MixClient(opts);
      break;
    case Modes.REAL:
      this.client = new RealClient(opts);
      break;
    default:
      throw new Error(ErrorMessages.INVALID_MODE);
  }
}

FlexApi.prototype.get = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.get(url, payload);
};

FlexApi.prototype.post = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.post(url, payload);
};

FlexApi.prototype.put = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.put(url, payload);
};

FlexApi.prototype.patch = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.patch(url, payload);
};

FlexApi.prototype.head = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.head(url, payload);
};

FlexApi.prototype.options = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.options(url, payload);
};

FlexApi.prototype.delete = async function (url, payload = {}) {
  if (!this.client) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.client.delete(url, payload);
};

export default FlexApi;
export { Modes, Clients, DelayInterval };
