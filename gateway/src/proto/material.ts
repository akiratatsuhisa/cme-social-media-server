// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.3
// source: src/proto/material.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'material';

export interface Empty {}

export interface SourceRequest {
  color: number;
}

export interface ImageRequest {
  buffer: Uint8Array;
}

export interface ThemeReply {
  source: number;
  style: string;
}

export const MATERIAL_PACKAGE_NAME = 'material';

export interface MaterialClient {
  test(request: Empty): Observable<ThemeReply>;

  generateFromSourceColor(request: SourceRequest): Observable<ThemeReply>;

  generateFromImageBuffer(request: ImageRequest): Observable<ThemeReply>;
}

export interface MaterialController {
  test(
    request: Empty,
  ): Promise<ThemeReply> | Observable<ThemeReply> | ThemeReply;

  generateFromSourceColor(
    request: SourceRequest,
  ): Promise<ThemeReply> | Observable<ThemeReply> | ThemeReply;

  generateFromImageBuffer(
    request: ImageRequest,
  ): Promise<ThemeReply> | Observable<ThemeReply> | ThemeReply;
}

export function MaterialControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'test',
      'generateFromSourceColor',
      'generateFromImageBuffer',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Material', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Material', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MATERIAL_SERVICE_NAME = 'Material';
