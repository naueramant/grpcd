import * as grpc from 'grpc';
import * as protoloader from '@grpc/proto-loader';

import {
    gRPCError
} from './errors';

type Service = {
    protoPath ? : string,
    methods ? : Map < string, Function >
}

let gRPCServer = null;

const services: Map < string, Service > = new Map();
const instances: Map < string, any > = new Map();

export function Service(protoPath: string) {
    return (constructor: Function) => {
        const name = constructor.name;

        if (!services.has(name)) {
            services.set(name, {
                methods: new Map()
            });
        }

        const service = services.get(name);
        service.protoPath = protoPath;
    }
}

export function RPC(name?: string) {

    return (target, key, descriptor) => {

        const className = target.constructor.name;
        
        if (!services.has(className)) {
            services.set(className, {
                methods: new Map()
            });
        }
        
        services.get(className).methods.set(name || key, descriptor.value);
        
        return descriptor;
    }
}

export const server = {
    start, 
    add
};

function add(serviceInstance: any) {
    const name = serviceInstance.constructor.name;

    if (gRPCServer) {
        throw Error(`Server already started, couldn't add service ${name}`);
    }

    if (instances.has(name)) {
        throw Error(`Service ${name} already added`);
    }

    instances.set(serviceInstance.constructor.name, serviceInstance);
}

function start(host: string = "0.0.0.0", port: number = 50051) {
    gRPCServer = new grpc.Server();

    const returnCode = gRPCServer.bind(
        `${host}:${port}`,
        grpc.ServerCredentials.createInsecure()
    );

    if (returnCode === 0) {
        throw Error(`Failed to bind GRPC server on ${host}:${port}`);
    }

    addServices()

    gRPCServer.start();
}

function addServices() {
    for (let [serviceName, data] of services) {
        try {
            const packageDefinition: any = protoloader.loadSync(data.protoPath);
            const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition);
            const serviceProto: any = getServiceProto(protoDescriptor, packageDefinition);

            if (serviceName in serviceProto) {
                const ctx = instances.get(serviceName);
                const service = serviceProto[serviceName].service;

                const methods = {};

                for (let [methodName, func] of data.methods) {
                    methods[methodName] = wrapMethod(func, ctx);
                }

                gRPCServer.addService(service, methods);
            }
        } catch (e) {
            throw Error(`Failed to initialize all services ${e.message}`);
        }
    }
}

function wrapMethod(func, ctx) {
    return ((call, callback) => {
        (async () => {
            try {
                const res = await func.call(ctx, call.request);
                callback(null, res);
            } catch (e) {
                if (e instanceof gRPCError) {
                    callback({
                        message: e.message,
                        code: e.code
                    }, null);
                } else {
                    throw e;
                }
            }
        })();
    });
}

function getServicePackagePath(protoDescriptor: any): string[] {
    const keys = Object.keys(protoDescriptor);
    const result = []

    if (keys.length > 0) {
        result.push(...keys[0].split('.').slice(0, -1))
    }

    return result;
}

function getServiceProto(protoDescriptor: any, packageDefinition: any): any {
    const path = getServicePackagePath(packageDefinition);
    return path.reduce((desc, k) => desc[k], protoDescriptor);
}