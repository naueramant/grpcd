import * as gRPC from '../src/index';
import { HelloParameters, HelloResponse, ErrorResponse, ErrorParameters } from './hello_pb';
import { GoodbyeParameters, GoodbyeResponse } from './goodbye_pb';

import { InternalError } from '../src/errors';

@gRPC.Service(__dirname + '/hello.proto')
class HelloService {

    private counter = 1;
    
    @gRPC.RPC
    public hello(params: HelloParameters.AsObject): HelloResponse.AsObject {
        return {
            response: `Hello ${params.name} number ${this.counter++}`
        };
    }

    @gRPC.RPC
    public error(params: ErrorParameters.AsObject): ErrorResponse.AsObject {
        throw new InternalError("This is a very serious error!");
    }
}

@gRPC.Service(__dirname + '/goodbye.proto')
class GoodbyeService {
    
    @gRPC.RPC
    public async goodbye(params: GoodbyeParameters.AsObject): Promise<GoodbyeResponse.AsObject> {
        return {
            response: await this.generateGoodbye(params.name)
        };
    }

    private async generateGoodbye(name): Promise<string> {
        return `Async goodbye ${name}`;
    }
}

gRPC.add(new HelloService());
gRPC.add(new GoodbyeService());

//gRPC.start();
