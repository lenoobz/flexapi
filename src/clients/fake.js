import { FakeOpts, ErrorMessages } from "../consts";
import processURL from "../utils";

function FakeClient(opts) {
  const { fake } = opts;

  if (!fake || !fake.endpoints) {
    throw new Error(ErrorMessages.INVALID_FAKE_CONFIG);
  }

  this.opts = Object.assign(FakeOpts, fake);
}

FakeClient.prototype.mutualRequest = function (url, payload = {}) {
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
};

FakeClient.prototype.get = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.post = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.put = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.patch = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.head = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.options = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

FakeClient.prototype.delete = async function (url, payload = {}) {
  return await this.mutualRequest(url, payload);
};

export default FakeClient;
