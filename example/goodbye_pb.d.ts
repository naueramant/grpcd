// package: Proto.Goodbye
// file: goodbye.proto

import * as jspb from "google-protobuf";

export class GoodbyeParameters extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GoodbyeParameters.AsObject;
  static toObject(includeInstance: boolean, msg: GoodbyeParameters): GoodbyeParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GoodbyeParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GoodbyeParameters;
  static deserializeBinaryFromReader(message: GoodbyeParameters, reader: jspb.BinaryReader): GoodbyeParameters;
}

export namespace GoodbyeParameters {
  export type AsObject = {
    name: string,
  }
}

export class GoodbyeResponse extends jspb.Message {
  getResponse(): string;
  setResponse(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GoodbyeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GoodbyeResponse): GoodbyeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GoodbyeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GoodbyeResponse;
  static deserializeBinaryFromReader(message: GoodbyeResponse, reader: jspb.BinaryReader): GoodbyeResponse;
}

export namespace GoodbyeResponse {
  export type AsObject = {
    response: string,
  }
}

