import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';
import { DateFormInputs } from '../types/user';

interface DateFormProps {
  onSubmit: SubmitHandler<DateFormInputs>;
  defaultValues?: DateFormInputs;
}

const DateForm: React.FC<DateFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    register,
    handleSubmit,
  } = useForm<DateFormInputs>({
    defaultValues: defaultValues || {
      name: '',
      dateOfBirth: null,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto' }}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          {...register('name')}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="生年月日"
              value={field.value}
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          送信
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateForm;
