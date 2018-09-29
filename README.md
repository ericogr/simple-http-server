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
And WS log:

```sh
Date time: Sun Feb 18 2018 09:29:18 GMT-0300 (-03)
Method: POST
URL: /test/123/xpto
Receive Body: {
  "{\"test\": 123}": ""
}
Send body: {"id":961776}
```

Upload files:

```sh
curl -v -F 'file1=@/tmp/file.bin' -F 'file2=@/tmp/file.bin' http://localhost:8080/test
```
