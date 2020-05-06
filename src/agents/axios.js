import { ErrorMessages, AxiosDefault } from "../consts";

function AxiosClient(opts) {
  const { instance, errorHandler, config } = opts;

  if (!config || !config.axios) {
    throw new Error(ErrorMessages.INVALID_AXIOS_CONFIG);
  }

  this.errorHandler = errorHandler || AxiosDefault.errorHandler;
  this.axiosConfig = Object.assign({}, AxiosDefault, config.axios);
  this.axios = instance.create(this.axiosConfig);
}

AxiosClient.prototype.extractPayload = function (payload) {
  const { headers, params, errorHandler } = payload;
  const paramOpts = Object.assign({}, this.axiosConfig.params, params);
  const headerOpts = Object.assign({}, this.axiosConfig.headers, headers);

  return [
    {
      ...this.axiosConfig,
      headers: headerOpts,
      params: paramOpts,
    },
    errorHandler || this.errorHandler,
  ];
};

AxiosClient.prototype.get = async function (url, payload = {}) {
  // Extract request detail from payload object
  const [config, errorHandler] = this.extractPayload(payload);

  try {
    return await this.axios.get(url, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.GET);
  }
};

AxiosClient.prototype.post = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { data, ...rest } = payload;
  const [config, errorHandler] = this.extractPayload(rest);

  try {
    return await this.axios.post(url, data, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.POST);
  }
};

AxiosClient.prototype.put = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { data, ...rest } = payload;
  const [config, errorHandler] = this.extractPayload(rest);

  try {
    return await this.axios.put(url, data, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.PUT);
  }
};

AxiosClient.prototype.patch = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { data, ...rest } = payload;
  const [config, errorHandler] = this.extractPayload(rest);

  try {
    return await this.axios.patch(url, data, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.PATCH);
  }
};

AxiosClient.prototype.head = async function (url, payload = {}) {
  // Extract request detail from payload object
  const [config, errorHandler] = this.extractPayload(payload);

  try {
    return await this.axios.head(url, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.HEAD);
  }
};

AxiosClient.prototype.options = async function (url, payload = {}) {
  // Extract request detail from payload object
  const [config, errorHandler] = this.extractPayload(payload);

  try {
    return await this.axios.options(url, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.OPTIONS);
  }
};

AxiosClient.prototype.delete = async function (url, payload = {}) {
  // Extract request detail from payload object
  const [config, errorHandler] = this.extractPayload(payload);

  try {
    return await this.axios.delete(url, config);
  } catch (e) {
    errorHandler(e, ErrorMessages.DELETE);
  }
};

export default AxiosClient;
