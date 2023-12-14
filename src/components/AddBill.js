import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Button,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddBill = ({ onSubmit }) => {
  const currencies = [
    {
      value: 'INR',
      label: '₹',
    },
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [billDetails, setBillDetails] = useState('');
  const [currencyDetails, setCurrencyDetails] = useState('INR');
  const [amountDetails, setAmountDetails] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [difference, setDifference] = useState(0);

  const handleNameChange = (e) => {
    setBillDetails(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrencyDetails(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmountDetails(e.target.value);
  };

  const handleClear = () => {
    setBillDetails('');
    setCurrencyDetails('INR');
    setAmountDetails('');
    setDueDate(new Date());
  };

  const handleSubmit = () => {
    if (billDetails.length > 0 && amountDetails.length > 0) {
      setBillDetails('');
      setCurrencyDetails('INR');
      setAmountDetails('');
      setDueDate(new Date());
      onSubmit(billDetails, currencyDetails, amountDetails, dueDate.toDateString(), difference);
    } else alert('Please Enter Bill Details');
  };

  return (
    <>
      <div
        className="addbill"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '300px',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Bill"
          variant="outlined"
          value={billDetails}
          onChange={handleNameChange}
          sx={{ width: '100%' }}
        />
        <div style={{ display: 'flex', gap: '20px' }}>
          <FormControl variant="outlined" style={{ width: '25%' }}>
            <TextField
              id="outlined-select-currency"
              select
              value={currencyDetails}
              onChange={handleCurrencyChange}
              variant="outlined"
              sx={{ width: '100%' }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth variant="outlined" style={{ width: '75%' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amountDetails}
              onChange={handleAmountChange}
              label="Amount"
            />
          </FormControl>
        </div>
        <DatePicker
          selected={dueDate}
          onChange={(date) => {
            setDueDate(date);

            const currentDate = new Date();
            const diff = Math.ceil(
              (date - currentDate) / (1000 * 60 * 60 * 24)
            );
            console.log(diff);
            setDifference(diff);
          }}
          dateFormat="dd/MM/yyyy"
          showIcon
          isClearable
          scrollableYearDropdown
          showYearDropdown
        />
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </>
  );
};

export default AddBill;
