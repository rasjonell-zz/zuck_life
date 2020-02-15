declare module 'json-api-serializer' {
  class JSONAPISerializer {
    constructor(options?: JSONAPISerializer.Options);

    register(
      type: string,
      schema?: string | JSONAPISerializer.Options,
      options?: JSONAPISerializer.Options,
    ): void;

    serialize(
      type: string | object,
      data: any,
      schema?: string,
      extraData?: any,
      excludeData?: boolean,
      overrideSchemaOptions?: JSONAPISerializer.Options,
    ): void;

    serializeAsync(
      type: string | object,
      data: any,
      schema?: string,
      extraData?: any,
      excludeData?: boolean,
      overrideSchemaOptions?: JSONAPISerializer.Options,
    ): Promise<any>;

    deserialize(type: string, data: any, schema?: string): void;

    deserializeAsync(type: string, data: any, schema?: string): Promise<any>;

    serializeError(error: any): void;
  }

  namespace JSONAPISerializer {
    export type Options = {
      id?: string;
      blacklist?: string[];
      whitelist?: string[];
      jsonapiObject?: boolean;
      links?: (() => void) | object;
      relationships?: object;
      topLevelLinks?: (() => void) | object;
      topLevelMeta?: (() => void) | object;
      meta?: (() => void) | object;
      blacklistOnDeserialize?: string[];
      whitelistOnDeserialize?: string[];
      convertCase?: string;
      unconvertCase?: string;
      convertCaseCacheSize?: number;
    };
  }

  export = JSONAPISerializer;
}
