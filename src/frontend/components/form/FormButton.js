import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../copy/AppButton';

export default function FormButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} />;
}