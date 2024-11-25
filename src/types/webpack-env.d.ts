declare namespace __WebpackModuleApi {
  interface RequireContext {
    (key: string): any;
    keys(): string[];
    resolve(key: string): string;
  }
}

declare const require: {
  context: (
    path: string,
    deep?: boolean,
    filter?: RegExp
  ) => __WebpackModuleApi.RequireContext;
};
