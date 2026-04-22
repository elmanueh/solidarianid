import type { ReactNode } from 'react';

export type PersonalInfoFormValues = {
  fullName: string;
  username: string;
  mobilePhone: string;
  city: string;
  countryCode: string;
};

export type PersonalInfoFieldKey = keyof PersonalInfoFormValues;

export type PersonalInfoFieldConfig = {
  key: PersonalInfoFieldKey;
  label: string;
  type: 'text' | 'tel' | 'select';
  icon: ReactNode;
  placeholder: string;
};

export type CountryOption = {
  label: string;
  value: string;
};
