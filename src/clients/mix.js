import FakeClient from "./fake";
import processURL from "../utils";
import { Verbs, ErrorMessages } from "../consts";
import RealClient from "./real";

class MixClient {
  constructor(opts) {
    const { fake, real } = opts;

    if (!fake || !fake.endpoints) {
      throw new Error(ErrorMessages.INVALID_FAKE_CONFIG);
    }

    if (!real) {
      throw new Error(ErrorMessages.INVALID_REAL_CONFIG);
    }

    this.endpoints = fake.endpoints;
    this.fakeClient = new FakeClient(opts);
    this.realClient = new RealClient(opts);
  }

  getRequestMethod(verb) {
    const self = this;
    return async function (url, payload = {}) {
      const processedUrl = processURL(url, payload);
      const handler = self.endpoints[processedUrl];

      if (handler) {
        return self.fakeClient[verb](url, payload);
      }

      return self.realClient[verb](url, payload);
    };
  }

  async get(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.GET);
    return await requestMethod(url, payload);
  }

  async post(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.POST);
    return await requestMethod(url, payload);
  }

  async put(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.PUT);
    return await requestMethod(url, payload);
  }

  async patch(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.PATCH);
    return await requestMethod(url, payload);
  }

  async head(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.HEAD);
    return await requestMethod(url, payload);
  }

  async options(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.OPTIONS);
    return await requestMethod(url, payload);
  }

  async delete(url, payload = {}) {
    const requestMethod = this.getRequestMethod(Verbs.DELETE);
    return await requestMethod(url, payload);
  }
}

export default MixClient;
