import * as grpc from 'grpc';
import * as protoloader from '@grpc/proto-loader';

type Service = {
    name?: string,
    protoPath?: string,
    class?: any,
    methods: Map<string, Function>
}

export module gRPC {
    let server = null;

    export const services: Map<string, Service> = new Map();
    const instances: Map<string, any> = new Map();

    export function Service(protoPath: string) {
        return (constructor: Function) => {
            const service = services.get(constructor.name);
            service.protoPath = protoPath;
            service.class = constructor;
            service.name = constructor.name;
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

    export function start(host: string = "0.0.0.0", port: number = 50051) {
        server = new grpc.Server();

        const returnCode = server.bind(
            `${host}:${port}`, 
            grpc.ServerCredentials.createInsecure()
        );

        if (returnCode === 0) {
            throw Error(`Failed to bind GRPC server on ${host}:${port}`);
        }
    
        addServices()

        server.start();
    }

    export function add(serviceInstance: any) {
        if (server) {
            throw Error("Server already started, couldn't add service " + serviceInstance.constructor.name);
        }

        instances.set(serviceInstance.constructor.name, serviceInstance);
    }

    function addServices() {
        for (let s of services.values()) {
            try {
                const packageDefinition = protoloader.loadSync(s.protoPath);
                const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition);
            
                const serviceProto: any = Object.values(protoDescriptor.Proto)[0];
                
                if (s.name in serviceProto) {
                    const methods = {};
                        
                    for (let m of s.methods) {
                        methods[m[0]] = ((call, callback) => {
                            (async () => {
                                await m[1].bind(instances.get(s.name))(call, callback);
                            })();
                        });
                    }
                    
                    server.addService(serviceProto[s.name].service, methods);
                }
            } catch(e) {
                throw Error('Failed to initialize all service' + e.message);
            }
        }
    }
}
