# flexapi

Flexible swap mode and API request client

### Config object initial thought

```json
{
  "mode": "fake | real | mix",
  "real": {
    "client": "axios | fetch",
    "instance": axios,
    "errorHandler": () => {},
    "config": {
      "axios": {},
      "fetch": {},
      "ajax": {}
    }
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
