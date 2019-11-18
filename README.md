# gRPC decorators

Making gRPC services easier in typescript.

## Example

```ts

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
        throw new NotFoundError("Greeting was not found!!");
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