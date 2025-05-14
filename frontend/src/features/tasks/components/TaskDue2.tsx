import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface DateFormData {
  date: Date;
}

interface DateFormProps {
  onSubmit: SubmitHandler<DateFormData>;
  defaultValues?: DateFormData;
}

const SimpleDatePicker: React.FC<DateFormProps> = ({ onSubmit, defaultValues }) => {
  const initialDate = new Date();
  const [startDate, setStartDate] = useState(initialDate);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
    />
  );
};

//export default SimpleDatePicker;
