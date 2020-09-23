# 4.1 Exercise: Docker compose
This folder contains the submission for the exercise 4.1. This readme is part of the required explanation for the submission. There's a copy of the docker-compose.yaml (with slight modifications to file paths) in the root of the repository so that you can use docker-compose without changing directories, as required by the task description.

## Explanation
Ports and connection strings (for Service 1 -> Service 2 contact) are controlled via environment variables for both services. These are defined in the docker-compose file. I designated port 8001 for the Service 1 as was mandated by the task description. Port 8002 was designated to Service 2 out of simplicity (and testing outside of containers). Within Docker you could use the same port for both services as they're not bound under the same IP-addresses (within the internal network), and only Service 1 is exposed to the outside world. The address that Service 1 can find Service 2 with is http://service2:8002, as service2 is the designated name for Service 2 in the docker-compose.yaml, and Docker associates domain names within the virtual networks based on these service names. You could also manually assign ip addresses for the services, and use those in the connection strings. The ips and addresses you see in the response correspond to the addresses and ports within the Docker private network.

The programs themselves are rather simple. I use the http package provided by Node to create a simple http server that listens on the given port. Once a request is received the http server executes the procedure I've attached to the request-action of the server. Service 1 sends a HTTP GET -request to Service 2, waits for its reply, and then responds to its original request with the format specified below. The Service 2 server only responds to requests with a single string as specified below.

### Service 1
This service is a simple http-server created with Node.js that upon receiving a request sends another request to Service 2. I utilized a npm library called axios (that I'm previously familiar with) to simplify sending requests to Service 2.

The response of this request is of the following format:
```
"Hello from " + <Remote IP address and port of the incoming request to Service 1>
"to " + <Local IP address and port of Service 1>
"Hello from " + <Remote IP address and port of the incoming request (address & port of Service 1)>
"to " + <Local IP address and port of Service 2>
```

Example:
```
Hello from ::ffff:172.22.0.1:46028
to ::ffff:172.22.0.3:8001
Hello from ::ffff:172.22.0.3:46408
to ::ffff:172.22.0.2:8002
```

### Service 2
Simple Node.js http-server that responds with the following format:
```
"Hello from " + <Remote IP address and port of the incoming request>
"to " + <Local IP address and port of Service 2>
```