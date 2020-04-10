import { FakeOpts, ErrorMessages } from "../consts";
import processURL from "../utils";

class FakeClient {
  constructor(opts) {
    const { fake } = opts;

    if (!fake || !fake.endpoints) {
      throw new Error(ErrorMessages.INVALID_FAKE_CONFIG);
    }

    this.opts = Object.assign(FakeOpts, fake);
  }

  mutualRequest(url, payload = {}) {
    const processedUrl = processURL(url, payload);
    const { delay, endpoints } = this.opts;
    const handlerFunc = endpoints[processedUrl];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (handlerFunc) {
          resolve(handlerFunc(payload));
        } else {
          reject(new Error(ErrorMessages.NO_HANDLER));
        }
      }, delay);
    });
  }

  async get(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async post(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async put(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async patch(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async head(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async options(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }

  async delete(url, payload = {}) {
    return await this.mutualRequest(url, payload);
  }
}

export default FakeClient;
