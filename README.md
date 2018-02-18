# simple-http-server-test
A simple webservice to answer any call, log time, method, content and url and returns random ID.

example:

```sh
npm install
./run.sh 8081
```

Calling this ws:
```sh
curl -X POST -d '{"test": 123}' http://localhost:8081/test/123/xpto
```

Return:

```sh
{"id":961776}
```
