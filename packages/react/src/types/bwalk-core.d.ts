declare module '@bwalkt/core' {
  type Renderable<AdditionalRenderable = null> = string | number | boolean | null | undefined | AdditionalRenderable;
  
  interface FieldConfig<AdditionalRenderable = null, FieldTypes = string, FieldWrapper = any, CustomData = Record<string, any>> {
    description?: Renderable<AdditionalRenderable>;
    inputProps?: Record<string, any>;
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
    default?: any;
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
    data: any;
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
  
  interface SchemaProvider<T = any> {
    parseSchema(): ParsedSchema;
    validateSchema(_values: T): SchemaValidation;
    getDefaultValues(): Record<string, any>;
  }
  
  export function getLabel(field: ParsedField): string | number | true;
  export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema;
  export function validateSchema(schemaProvider: SchemaProvider, values: any): SchemaValidation;
  export function getDefaultValues(schemaProvider: SchemaProvider): Record<string, any>;
  export function removeEmptyValues<T extends Record<string, any>>(values: T): Partial<T>;
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