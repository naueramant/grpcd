import * as grpc from 'grpc';
import * as protoloader from '@grpc/proto-loader';

type Service = {
    protoPath?: string,
    class?: any,
    methods: Map<string, Function>
}

export module gRPC {
    const services: Map<string, Service> = new Map();

    export function Service(protoPath: string) {
        return (constructor: Function) => {
            const service = services.get(constructor.name);
            service.protoPath = protoPath;
            service.class = constructor;
        }
    }
    
    export function RPC(target, name, descriptor) {
        const className = target.constructor.name;

        if (!services.has(className)) {
            services.set(className, {methods: new Map()})
        }

        services.get(className).methods.set(name, descriptor.value);

        return descriptor;
    }

    export function start() {
        initServer();



        console.log(services);
    }

    export function stop() {
        console.log(services);
    }

    function initServer() {
        const i = new (services.get('ExampleService').class)();
        services.get('ExampleService').methods.get('hello').bind(i)();

        const server = new grpc.Server();
        const SERVER_ADDRESS = "0.0.0.0:5001";
    }
}
