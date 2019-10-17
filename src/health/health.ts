import { Service, RPC } from '../decorators';
import * as pb from './health_pb';
import { UnimplementedError } from '../errors';

/*
* Adds support for the gRPC health checking protocol
* https://github.com/grpc/grpc/blob/master/doc/health-checking.md
*/

export enum ServingStatus {
    NOT_SERVING = pb.HealthCheckResponse.ServingStatus.NOT_SERVING,
    SERVICE_UNKNOWN = pb.HealthCheckResponse.ServingStatus.SERVICE_UNKNOWN,
    SERVING = pb.HealthCheckResponse.ServingStatus.SERVING,
    UNKNOWN = pb.HealthCheckResponse.ServingStatus.UNKNOWN
}

@Service(__dirname + '/health.proto')
export class Health {

    private statusMap = {
        "": ServingStatus.NOT_SERVING
    };

    @RPC('Check') 
    public check(params: pb.HealthCheckRequest.AsObject): pb.HealthCheckResponse.AsObject {
        return {
            status: this.statusMap[params.service]
        }
    }

    @RPC('Watch') 
    public watch() {
        throw new UnimplementedError();
    }

    public addService(serviceName: string | any) {
        let name = serviceName;
        if ((typeof serviceName) != 'string') {
            name = serviceName.constructor.name;
        }

        this.statusMap[name] = ServingStatus.NOT_SERVING;
    }

    public updateStatus(serviceName: string, status: ServingStatus) {
        this.statusMap[serviceName] = status;
    }
}