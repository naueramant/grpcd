export type Service = {
    protoPath ? : string,
    methods ? : Map < string, Function >
}

export const services: Map < string, Service > = new Map();
export const instances: Map < string, any > = new Map();

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