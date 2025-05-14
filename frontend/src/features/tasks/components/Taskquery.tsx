import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserFormInputs } from '../types.ts';

// バリデーションスキーマ
const schema = yup.object({
  name: yup.string().required('名前は必須です'),
});

interface UserFormProps {
  onSubmit: SubmitHandler<UserFormInputs>;
  defaultValues?: UserFormInputs;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto' }}>
      <TextField
        fullWidth
        margin="normal"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Box>
  );
};

export default UserForm;
