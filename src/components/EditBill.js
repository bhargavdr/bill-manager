import React, { useState, useEffect } from 'react';
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

const EditBill = ({
  onSubmit,
  billDetails: { name, currency, amount, dueDate },
}) => {
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

  const [originalBillDetails] = useState({
    name: name || '',
    currency: currency || 'INR',
    amount: amount || '',
    dueDate: dueDate ? new Date(dueDate) : new Date(),
    difference: 0,
  });

  const [editedBillDetails, setEditedBillDetails] = useState({
    ...originalBillDetails,
  });

  useEffect(() => {
    const currentDate = new Date();
    const diff = Math.ceil(
      (editedBillDetails.dueDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    setEditedBillDetails((prevState) => ({ ...prevState, difference: diff }));
  }, [editedBillDetails.dueDate]);

  const handleNameChange = (e) => {
    setEditedBillDetails({ ...editedBillDetails, name: e.target.value });
  };

  const handleCurrencyChange = (e) => {
    setEditedBillDetails({ ...editedBillDetails, currency: e.target.value });
  };

  const handleAmountChange = (e) => {
    setEditedBillDetails({ ...editedBillDetails, amount: e.target.value });
  };

  const handleRevert = () => {
    setEditedBillDetails({ ...originalBillDetails });
  };

  const handleSubmit = () => {
    if (
      editedBillDetails.name.length > 0 &&
      editedBillDetails.amount.length > 0
    ) {
      onSubmit(
        editedBillDetails.name,
        editedBillDetails.currency,
        editedBillDetails.amount,
        editedBillDetails.dueDate.toDateString(),
        editedBillDetails.difference
      );
    } else {
      alert('Please Enter Bill Details');
    }
  };

  return (
    <div
      className="editbill"
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
        value={editedBillDetails.name}
        onChange={handleNameChange}
        sx={{ width: '100%' }}
      />
      <div style={{ display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" style={{ width: '25%' }}>
          <TextField
            id="outlined-select-currency"
            select
            value={editedBillDetails.currency}
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
            value={editedBillDetails.amount}
            onChange={handleAmountChange}
            label="Amount"
          />
        </FormControl>
      </div>
      <DatePicker
        selected={editedBillDetails.dueDate}
        onChange={(date) =>
          setEditedBillDetails({ ...editedBillDetails, dueDate: date })
        }
        dateFormat="dd/MM/yyyy"
        showIcon
        isClearable
        scrollableYearDropdown
        showYearDropdown
      />
      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
      <Button variant="outlined" onClick={handleRevert}>
        Revert Changes
      </Button>
    </div>
  );
};

export default EditBill;
