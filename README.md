# gRPCd

Making gRPC services easier to use in typescript.

## Installation

```bas
yarn add grpcd 
```

## Example

```ts
import { server, Service, RPC, Errors } from 'grpcd';
import { HelloParameters, HelloResponse, ErrorResponse, ErrorParameters } from './hello_pb';

@Service(__dirname + '/hello.proto')
class HelloService {

    private counter = 1;

    @RPC()
    public hello(params: HelloParameters.AsObject): HelloResponse.AsObject {
        return {
            response: `Hello ${params.name} number ${this.counter++}`
        };
    }

    // Throw a grpc error
    @RPC()
    public error(params: ErrorParameters.AsObject): ErrorResponse.AsObject {
        throw new Errors.NotFoundError("Greeting was not found!!");
    }
}

server.addService(new HelloService());
server.start();

```

## TODO:

- [x] Service decorator
- [x] RPC decorator
- [x] Async calls
- [x] Throwing errors
- [ ] gRPC streaming

## Protobox

For easier source file and dependency management for gRPC checkout [protobox](https://github.com/uniwise/protobox).
