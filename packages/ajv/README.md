# @bwalkt/ajv

AJV (Another JSON Schema Validator) provider for AutoForm.

## Installation

```bash
npm install @bwalkt/ajv ajv
```

## Usage

```typescript
import { AjvProvider } from "@bwalkt/ajv";
import type { JSONSchemaType } from "ajv";

interface FormData {
  name: string;
  email: string;
  age: number;
  subscribe: boolean;
}

const schema: JSONSchemaType<FormData> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Your full name",
    },
    email: {
      type: "string",
      format: "email",
      description: "Your email address",
    },
    age: {
      type: "number",
      minimum: 0,
      maximum: 120,
      description: "Your age",
    },
    subscribe: {
      type: "boolean",
      default: false,
      description: "Subscribe to newsletter",
    },
  },
  required: ["name", "email", "age"],
};

const provider = new AjvProvider(schema);

// Use with AutoForm
<AutoForm provider={provider} onSubmit={handleSubmit} />
```

## Field Configuration

You can add AutoForm-specific field configuration using the `withFieldConfig` helper:

```typescript
import { withFieldConfig, createField } from "@bwalkt/ajv";

const schema = {
  type: "object",
  properties: {
    name: withFieldConfig(
      { type: "string" },
      {
        label: "Full Name",
        fieldType: "text",
        order: 1,
      },
    ),
    role: createField(
      {
        type: "string",
        enum: ["admin", "user", "guest"],
      },
      {
        label: "User Role",
        fieldType: "select",
      },
    ),
  },
};
```

## Advanced Usage

### Custom AJV Options

You can pass custom AJV options to the provider:

```typescript
const provider = new AjvProvider(schema, {
  coerceTypes: true,
  removeAdditional: true,
  useDefaults: true,
});
```

### Complex Schemas

The provider supports complex JSON schemas including:

- Nested objects
- Arrays
- Conditional schemas (anyOf, oneOf, allOf)
- Format validation (email, date, uri, etc.)
- Custom validation keywords

```typescript
const complexSchema: JSONSchemaType<ComplexForm> = {
  type: "object",
  properties: {
    user: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
      },
      required: ["name", "email"],
    },
    tags: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 5,
    },
    preferences: {
      anyOf: [
        { type: "string" },
        {
          type: "object",
          properties: {
            theme: { type: "string", enum: ["light", "dark"] },
            language: { type: "string" },
          },
        },
      ],
    },
  },
};
```
