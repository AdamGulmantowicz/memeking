import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
} from '@mantine/core';
import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'tabler-icons-react';

export interface IPasswordStrenghtInputProps {
  value: string;
  onChange: ChangeEventHandler;
}

export function PasswordStrenghtInput({
  value,
  onChange,
}: IPasswordStrenghtInputProps) {
  const { t } = useTranslation();

  function PasswordRequirement({
    meets,
    label,
  }: {
    meets: boolean;
    label: string;
  }) {
    return (
      <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
        <Center inline>
          {meets ? (
            <Check size="0.9rem" stroke="sm" />
          ) : (
            <X size="0.9rem" stroke="sm" />
          )}
          <Box ml={7}>{label}</Box>
        </Center>
      </Text>
    );
  }

  const requirements = [
    { re: /[0-9]/, label: t('signup.reqNum') },
    { re: /[a-z]/, label: t('signup.reqLower') },
    { re: /[A-Z]/, label: t('signup.reqUpper') },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: t('signup.reqSymbol') },
  ];
  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
  }

  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        value={value}
        onChange={onChange}
        placeholder={t('signup.password')}
        label={t('signup.password')}
        required
      />

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement
        label={t('signup.reqChar')}
        meets={value.length > 5}
      />
      {checks}
    </div>
  );
}

export default PasswordStrenghtInput;
