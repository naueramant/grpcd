import * as grpc from 'grpc';
import * as protoloader from '@grpc/proto-loader';
import * as deco from './decorators';

import {
    gRPCError
} from './errors';

let gRPCServer = null;

function addService(serviceInstance: any) {
    const name = serviceInstance.constructor.name;

    if (gRPCServer) {
        throw Error(`Server already started, couldn't add service ${name}`);
    }

    if (deco.instances.has(name)) {
        throw Error(`Service ${name} already added`);
    }

    deco.instances.set(serviceInstance.constructor.name, serviceInstance);
}

function start(port=50051, host="0.0.0.0") {
    gRPCServer = new grpc.Server();

    const returnCode = gRPCServer.bind(
        `${host}:${port}`,
        grpc.ServerCredentials.createInsecure()
    );

    if (returnCode === 0) {
        throw Error(`Failed to bind GRPC server on ${host}:${port}`);
    }

    loadServices();

    gRPCServer.start();
}

function loadServices() {
    for (let [serviceName, data] of deco.services) {
        try {
            const packageDefinition: any = protoloader.loadSync(data.protoPath, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });

            const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition);
            const serviceProto: any = getServiceProto(protoDescriptor, packageDefinition);

            if (serviceName in serviceProto) {
                const ctx = deco.instances.get(serviceName);
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
                const res = await func.call(ctx, call.request, call);
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

export const server = {
        start, 
        addService
};

export const Service = deco.Service;
export const RPC = deco.RPC;