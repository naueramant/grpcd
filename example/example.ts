import { gRPC } from '../src/index';

@gRPC.Service('example.proto')
class ExampleService {
    public msg = "Hello!";
    
    @gRPC.RPC
    public hello(call, callback) {
        console.log(this.msg);
    }
}

gRPC.start();















//const protoLoader = require('@grpc/proto-loader');
//const packageDefinition = protoLoader.loadSync('example/example.proto');
//console.log(packageDefinition);
