import * as grpc from 'grpc';

/*
    Implemented with information from:
    https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
*/

/**
 * Base class for gRPCErrors
 */
export class gRPCError extends Error {
    public code: any;

    constructor(message ?) {
        super(message);
        this.name = "gRPCError";
        this.code = -1;
    }
}

/**
 * The operation was cancelled, typically by the caller.
 */
export class CancelledError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "CancelledError";
        this.code = grpc.status.CANCELLED;
    }
}

/**
 * 	Unknown error. For example, this error may be returned when a Status value received from another address space belongs to an error space that is not known in this address space. Also errors raised by APIs that do not return enough error information may be converted to this error.
 */
export class UnknownError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "UnknownError";
        this.code = grpc.status.UNKNOWN;
    }
}

/**
 * The client specified an invalid argument. Note that this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are problematic regardless of the state of the system (e.g., a malformed file name).
 */
export class InvalidArgumentError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "InvalidArgumentError";
        this.code = grpc.status.INVALID_ARGUMENT;
    }
}

/**
 * 	The deadline expired before the operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long
 */
export class DeadlineExceededError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "DeadlineExceededError";
        this.code = grpc.status.DEADLINE_EXCEEDED;
    }
}

/**
 * 	Some requested entity (e.g., file or directory) was not found. Note to server developers: if a request is denied for an entire class of users, such as gradual feature rollout or undocumented whitelist, NOT_FOUND may be used. If a request is denied for some users within a class of users, such as user-based access control, PERMISSION_DENIED must be used.
 */
export class NotFoundError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "NotFoundError";
        this.code = grpc.status.NOT_FOUND;
    }
}

/**
 * 	Some requested entity (e.g., file or directory) was not found. Note to server developers: if a request is denied for an entire class of users, such as gradual feature rollout or undocumented whitelist, NOT_FOUND may be used. If a request is denied for some users within a class of users, such as user-based access control, PERMISSION_DENIED must be used.
 */
export class AlreadyExistsError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "AlreadyExistsError";
        this.code = grpc.status.ALREADY_EXISTS;
    }
}

/**
 * The caller does not have permission to execute the specified operation. PERMISSION_DENIED must not be used for rejections caused by exhausting some resource (use RESOURCE_EXHAUSTED instead for those errors). PERMISSION_DENIED must not be used if the caller can not be identified (use UNAUTHENTICATED instead for those errors). This error code does not imply the request is valid or the requested entity exists or satisfies other pre-conditions.
 */
export class PermissionDeniedError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "PermissionDeniedError";
        this.code = grpc.status.PERMISSION_DENIED;
    }
}

/**
 * The request does not have valid authentication credentials for the operation.
 */
export class UnauthenticatedError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "UnauthenticatedError";
        this.code = grpc.status.UNAUTHENTICATED;
    }
}

/**
 * Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.
 */
export class ResourceExhaustedError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "ResourceExhaustedError";
        this.code = grpc.status.RESOURCE_EXHAUSTED;
    }
}

/**
 * The operation was rejected because the system is not in a state required for the operation's execution. For example, the directory to be deleted is non-empty, an rmdir operation is applied to a non-directory, etc. Service implementors can use the following guidelines to decide between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE: (a) Use UNAVAILABLE if the client can retry just the failing call. (b) Use ABORTED if the client should retry at a higher level (e.g., when a client-specified test-and-set fails, indicating the client should restart a read-modify-write sequence). (c) Use FAILED_PRECONDITION if the client should not retry until the system state has been explicitly fixed. E.g., if an "rmdir" fails because the directory is non-empty, FAILED_PRECONDITION should be returned since the client should not retry unless the files are deleted from the directory.
 */
export class FailedPreconditionError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "FailedPreconditionError";
        this.code = grpc.status.FAILED_PRECONDITION;
    }
}


/**
 * The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort. See the guidelines above for deciding between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE.
 */
export class AbortedError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "AbortedError";
        this.code = grpc.status.ABORTED;
    }
}

/**
 * The operation was attempted past the valid range. E.g., seeking or reading past end-of-file. Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed if the system state changes. For example, a 32-bit file system will generate INVALID_ARGUMENT if asked to read at an offset that is not in the range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from an offset past the current file size. There is a fair bit of overlap between FAILED_PRECONDITION and OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error) when it applies so that callers who are iterating through a space can easily look for an OUT_OF_RANGE error to detect when they are done.
*/
export class OutOfRangeError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "OutOfRangeError";
        this.code = grpc.status.OUT_OF_RANGE;
    }
}

/**
 * The operation is not implemented or is not supported/enabled in this service.
 */
export class UnimplementedError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "UnimplementedError";
        this.code = grpc.status.UNIMPLEMENTED;
    }
}

/**
 * Internal errors. This means that some invariants expected by the underlying system have been broken. This error code is reserved for serious errors.
 */
export class InternalError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "InternalError";
        this.code = grpc.status.INTERNAL;
    }
}

/**
 * The service is currently unavailable. This is most likely a transient condition, which can be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations.
 */
export class UnavailableError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "UnavailableError";
        this.code = grpc.status.UNAVAILABLE;
    }
}

/**
 * The service is currently unavailable. This is most likely a transient condition, which can be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations.
 */
export class DataLossError extends gRPCError {
    constructor(message ?) {
        super(message);
        this.name = "DataLossError";
        this.code = grpc.status.DATA_LOSS;
    }
}
