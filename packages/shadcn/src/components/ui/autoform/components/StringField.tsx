import type { AutoFormFieldProps } from '@bwalkt/react'
import type React from 'react'
import { TextField } from '@/elements'

export const StringField: React.FC<AutoFormFieldProps> = ({ inputProps, error, id }) => {
  const { key, ...props } = inputProps

  return <TextField id={id} color={error ? 'error' : 'default'} variant="outline" size="2" {...props} />
}
