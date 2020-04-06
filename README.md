# flexapi

Flexible swap mode and API request client

### Config object initial thought

```json
{
  "mode": "fake | real | mix",
  "real": {
    "client": "axios | fetch | ajax",
    "axios": {
      "instance": axios,
      "bearerToken": null,
      "baseURL": "https://example.com/api/v1",
      "errorHandler": null
    },
    "fetch": {},
    "ajax": {}
  },
  "fake": {
    "delay": 1000,
    "endpoints": {
      "getExampleEndpoint": getExampleHandler,
      "postExampleEndpoint": postExampleHandler,
      "editExampleEndpoint": editExampleHandler,
      "deleteExampleEndPoint": deleteExampleHandler
    }
  }
}
```
