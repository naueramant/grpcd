import { server, health, Service, RPC } from '../src/index';
import { NotFoundError } from '../src/errors';

import { HelloParameters, HelloResponse, ErrorResponse, ErrorParameters } from './hello_pb';
import { GoodbyeParameters, GoodbyeResponse } from './goodbye_pb';
import { Health } from '../src/health/health';

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

@Service(__dirname + '/goodbye.proto')
class GoodbyeService {
    
    // Specify a rpc name, and make an async call
    @RPC('goodbye')
    public async sayGoodbye(params: GoodbyeParameters.AsObject): Promise<GoodbyeResponse.AsObject> {
        return {
            response: await this.generateGoodbye(params.name)
        };
    }

    private async generateGoodbye(name): Promise<string> {
        return `Async goodbye ${name}`;
    }
}



const inst1 = new HelloService();
const inst2 = new GoodbyeService();

server.addService(inst1);
server.addService(inst2);

/*
health.addService("HelloService"); // Add either by instance or string
health.addService(inst2);

setTimeout(() => {
    health.updateStatus(inst1, health.ServingStatus.SERVING);
    health.updateStatus("GoodbyeService", health.ServingStatus.SERVING); // update either by instance or string
}, 5000);
*/

server.start();


