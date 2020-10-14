# Exercise 5: Message queues
This folder contains the submission for the exercise 5. All implementations are under **this folder**, so you do want to **change to this directory before running docker-compose**. The messages will be written to messages/messages.txt file. However, this file won't be created/emptied before the obse-service has detected that RabbitMQ is up and running.

## HTTP vs Message based communication
I see that the Message based communication is very beneficial when you're running many/distributed systems (or microservices) under the same network. It's more lightweight compared to HTTP, and removes problems that arise if the sender of the request waits for responses from the recipient (for example if the recipient isn't responding). It's also useful when you want to "broadcast" messages to multiple recipients, as with HTTP you would need to send a separate request to each recipient unless you were running a similar kind of messaging queue for the messages as RabbitMQ.

HTTP on the other hand is very useful when you're dependant on knowing that the request has been processed and what the end result was (like in front-end to back-end communications). This depends entirely on the use case for the method of communication.

## Main learnings
As a concept this wasn't really anything new to me, as I've completed the Distributed Systems course where we worked with Erlang. However, it was interesting to see how you can create distributed systems in other languages, like TypeScript in this case, and how it can be handled through services like RabbitMQ (which runs on Erlang if I understood correctly).

I've also stumbled upon Docker volumes before, so they were familiar to me. It has been a while though, so this assignment was a nice refresher.