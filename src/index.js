import { ErrorMessages, Modes } from "./consts";
import FakeClient from "./clients/fake";
import MixClient from "./clients/mix";
import RealClient from "./clients/real";

class FlexApi {
  constructor(opts) {
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

  async get(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.get(url, payload);
  }

  async post(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.post(url, payload);
  }

  async put(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.put(url, payload);
  }

  async patch(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.patch(url, payload);
  }

  async head(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.head(url, payload);
  }

  async options(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.options(url, payload);
  }

  async delete(url, payload = {}) {
    if (!this.client) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.client.delete(url, payload);
  }
}

export default FlexApi;
