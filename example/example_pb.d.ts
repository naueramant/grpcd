// package: Proto.Hello
// file: example/example.proto

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
  getReponse(): string;
  setReponse(value: string): void;

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
    reponse: string,
  }
}

