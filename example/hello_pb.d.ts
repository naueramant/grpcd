// package: Proto.Hello
// file: hello.proto

import * as jspb from "google-protobuf";

export class HelloParameters extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloParameters.AsObject;
  static toObject(includeInstance: boolean, msg: HelloParameters): HelloParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloParameters;
  static deserializeBinaryFromReader(message: HelloParameters, reader: jspb.BinaryReader): HelloParameters;
}

export namespace HelloParameters {
  export type AsObject = {
    name: string,
  }
}

export class HelloResponse extends jspb.Message {
  getResponse(): string;
  setResponse(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HelloResponse): HelloResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloResponse;
  static deserializeBinaryFromReader(message: HelloResponse, reader: jspb.BinaryReader): HelloResponse;
}

export namespace HelloResponse {
  export type AsObject = {
    response: string,
  }
}

export class ErrorParameters extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorParameters.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorParameters): ErrorParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorParameters;
  static deserializeBinaryFromReader(message: ErrorParameters, reader: jspb.BinaryReader): ErrorParameters;
}

export namespace ErrorParameters {
  export type AsObject = {
  }
}

export class ErrorResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
  }
}

