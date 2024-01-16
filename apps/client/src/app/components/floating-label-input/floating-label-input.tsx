import { ChangeEventHandler, useState } from 'react';
import { TextInput } from '@mantine/core';
import styles from './floating-label-input.module.css';

export interface IFloatingLabelInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function FloatingLabelInput({
  label,
  placeholder,
  value,
  onChange,
}: IFloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);

  const floating = value.trim().length !== 0 || focused || undefined;

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      required
      classNames={styles}
      value={value}
      // TODO Fix type
      onChange={(event) => onChange(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
  );
}

export default FloatingLabelInput;
