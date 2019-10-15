import { gRPC } from '../src/index';

@gRPC.Service(__dirname + '/example.proto')
class HelloService {
    private counter = 1;
    
    constructor(public msg = "Hello") {}

    @gRPC.RPC
    public hello(call, callback) {
        callback(null, {
            response: `${this.msg} ${call.request.name} ${this.counter++}`
        });
    }
}

gRPC.add(new HelloService());

console.log(gRPC.services);

gRPC.start();