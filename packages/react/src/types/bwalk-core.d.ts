declare module '@bwalkt/core' {
  type Renderable<AdditionalRenderable = null> = string | number | boolean | null | undefined | AdditionalRenderable;
  
  interface FieldConfig<AdditionalRenderable = null, FieldTypes = string, FieldWrapper = unknown, CustomData = Record<string, unknown>> {
    description?: Renderable<AdditionalRenderable>;
    inputProps?: Record<string, unknown>;
    label?: Renderable<AdditionalRenderable>;
    fieldType?: FieldTypes;
    order?: number;
    fieldWrapper?: FieldWrapper;
    customData?: CustomData;
  }
  
  interface ParsedField<AdditionalRenderable = null, FieldTypes = string> {
    key: string;
    type: string;
    required: boolean;
    default?: unknown;
    description?: Renderable;
    fieldConfig?: FieldConfig<AdditionalRenderable, FieldTypes>;
    options?: [string, string][];
    schema?: ParsedField<AdditionalRenderable, FieldTypes>[];
  }
  
  interface ParsedSchema<AdditionalRenderable = null, FieldTypes = string> {
    fields: ParsedField<AdditionalRenderable, FieldTypes>[];
  }
  
  type SuccessfulSchemaValidation = {
    success: true;
    data: unknown;
  };
  
  type SchemaValidationError = {
    path: (string | number)[];
    message: string;
  };
  
  type ErrorSchemaValidation = {
    success: false;
    errors: SchemaValidationError[];
  };
  
  type SchemaValidation = SuccessfulSchemaValidation | ErrorSchemaValidation;
  
  interface SchemaProvider<T = unknown> {
    parseSchema(): ParsedSchema;
    validateSchema(_values: T): SchemaValidation;
    getDefaultValues(): Record<string, unknown>;
  }
  
  export function getLabel(field: ParsedField): string | number | true;
  export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema;
  export function validateSchema(schemaProvider: SchemaProvider, values: unknown): SchemaValidation;
  export function getDefaultValues(schemaProvider: SchemaProvider): Record<string, unknown>;
  export function removeEmptyValues<T extends Record<string, unknown>>(values: T): Partial<T>;
  export function sortFieldsByOrder(fields: ParsedField[] | undefined): ParsedField[];
  
  export {
    type ErrorSchemaValidation,
    type FieldConfig,
    type ParsedField,
    type ParsedSchema,
    type Renderable,
    type SchemaProvider,
    type SchemaValidation,
    type SchemaValidationError,
    type SuccessfulSchemaValidation
  };
}