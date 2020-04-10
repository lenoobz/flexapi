import { ErrorMessages } from "../consts";

function AxiosClient(opts) {
  const { instance, headerOpts, bearerToken, errorHandler, ...restOpts } = opts;

  this.axiosOpts = restOpts;
  this.headerOpts = headerOpts;
  this.bearerToken = bearerToken;
  this.errorHandler = errorHandler;
  this.axios = instance.create(restOpts);
}

AxiosClient.prototype.extractHeader = function (
  headerOpts,
  bearerToken = null
) {
  const accessToken = bearerToken || this.bearerToken;
  let headers = Object.assign({}, this.headerOpts, headerOpts);

  if (accessToken) {
    headers = Object.assign(headers, {
      Authorization: `Bearer ${accessToken}`,
    });
  }

  return { headers };
};

AxiosClient.prototype.extractParams = function (params) {
  return params ? { params } : {};
};

AxiosClient.prototype.get = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, params, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const paramOpts = this.extractParams(params);

    // Extract headers
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.get(url, {
      ...this.axiosOpts,
      ...headerOpts,
      ...paramOpts,
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.GET);
    }
    return null;
  }
};

AxiosClient.prototype.post = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.post(url, body, {
      ...this.axiosOpts,
      ...headerOpts,
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.POST);
    }
    return null;
  }
};

AxiosClient.prototype.put = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.put(url, body, {
      ...this.axiosOpts,
      ...headerOpts,
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.PUT);
    }
    return null;
  }
};

AxiosClient.prototype.patch = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.patch(url, body, {
      ...this.axiosOpts,
      ...headerOpts,
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.PATCH);
    }
    return null;
  }
};

AxiosClient.prototype.head = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.head(url, body, {
      ...this.axiosOpts,
      ...headerOpts,
    });

    // Return response data
    return resp.headers ? resp.headers : null;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.HEAD);
    }
    return null;
  }
};

AxiosClient.prototype.options = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.options(url, body, {
      ...this.axiosOpts,
      ...headerOpts,
    });

    // Return response data
    return resp.headers ? resp.headers : null;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.OPTIONS);
    }
    return null;
  }
};

AxiosClient.prototype.delete = async function (url, payload = {}) {
  // Extract request detail from payload object
  const { headers, body = {}, bearerToken, errorHandler } = payload;

  try {
    // Extract parameters
    const headerOpts = this.extractHeader(headers, bearerToken);

    // Make request
    const resp = await this.axios.delete(url, {
      data: { ...body },
      ...headerOpts,
      ...this.axiosOpts,
    });

    // Return response data
    return resp.data ? resp.data : resp;
  } catch (e) {
    // If errorHandler is provided use it otherwise use generic error handler
    if (errorHandler) {
      errorHandler(e);
    } else {
      this.errorHandler(e, ErrorMessages.DELETE);
    }
    return null;
  }
};

export default AxiosClient;
