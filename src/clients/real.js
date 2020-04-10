import { Clients, ErrorMessages, AxiosOpts } from "../consts";
import { AxiosClient } from "../agents";

function RealClient(opts) {
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

RealClient.prototype.get = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.get(url, payload);
};

RealClient.prototype.post = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.post(url, payload);
};

RealClient.prototype.put = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.put(url, payload);
};

RealClient.prototype.patch = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.patch(url, payload);
};

RealClient.prototype.head = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.head(url, payload);
};

RealClient.prototype.options = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.options(url, payload);
};

RealClient.prototype.delete = async function (url, payload = {}) {
  if (!this.realClient) {
    throw new Error(ErrorMessages.NO_CLIENT);
  }

  return await this.realClient.delete(url, payload);
};

export default RealClient;
