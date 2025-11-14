import Ajv from "ajv";
import type { JSONSchemaType, Schema } from "ajv";
import { SchemaProvider, ParsedSchema, SchemaValidation } from "@autoform/core";
import { parseSchema } from "./schema-parser";
import { getDefaultValues } from "./default-values";

export class AjvProvider<T = any> implements SchemaProvider<T> {
  private ajv: Ajv;
  private compiledSchema: any;

  /**
   * Provider to use AJV JSON schemas for AutoForm
   *
   * @param schema - JSON Schema to use for validation
   * @param ajvOptions - Optional Ajv configuration options
   */
  constructor(
    private schema: JSONSchemaType<T> | Schema,
    ajvOptions: any = {}
  ) {
    if (!schema) {
      throw new Error("AjvProvider: schema is required");
    }

    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      ...ajvOptions,
    });

    this.compiledSchema = this.ajv.compile(this.schema);
  }

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: T): SchemaValidation {
    const valid = this.compiledSchema(values);
    
    if (valid) {
      return { success: true, data: values } as const;
    }

    const errors = this.compiledSchema.errors || [];
    return {
      success: false,
      errors: errors.map((error) => ({
        path: error.instancePath
          ? error.instancePath.split("/").filter(Boolean)
          : [],
        message: error.message || "Validation error",
      })),
    } as const;
  }

  getDefaultValues(): Record<string, any> {
    return getDefaultValues(this.schema);
  }
}