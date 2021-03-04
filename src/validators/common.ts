
export type SchemaType<T> = Partial<{
    [K in keyof T]: any;
}>