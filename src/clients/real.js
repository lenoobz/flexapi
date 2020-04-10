import { Clients, ErrorMessages, AxiosOpts } from "../consts";
import { AxiosClient } from "../agents";

class RealClient {
  constructor(opts) {
    this.realClient = null;

    const { real } = opts;

    if (!real || !real.client) {
      throw new Error(ErrorMessages.INVALID_REAL_CONFIG);
    }

    if (real.client === Clients.AXIOS) {
      const { axios } = real;
      this.realClient = new AxiosClient(Object.assign(AxiosOpts, axios));
    } else {
      throw new Error(ErrorMessages.NO_IMPLEMENT);
    }
  }

  async get(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.get(url, payload);
  }

  async post(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.post(url, payload);
  }

  async put(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.put(url, payload);
  }

  async patch(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.patch(url, payload);
  }

  async head(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.head(url, payload);
  }

  async options(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.options(url, payload);
  }

  async delete(url, payload = {}) {
    if (!this.realClient) {
      throw new Error(ErrorMessages.NO_CLIENT);
    }

    return await this.realClient.delete(url, payload);
  }
}

export default RealClient;
