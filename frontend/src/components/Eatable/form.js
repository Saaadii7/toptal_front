import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { create, update } from '../../services/eatable'

const EatableForm = ({ eatable }) => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [item, setItem] = useState(eatable);

  const handleDateChange = (value) => {
    setItem({
      ...item, eating_time: value
    });
  };
  const handleChange = (event) => {
    const value = event.target.value
    setItem({
      ...item, [event.target.name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (item.id){
      const {id, ...rest} = item
      await update(item.id, rest)
    }else{
      await create(item)
    }
    navigate("/eatables")
  };

  return (
    <Box component="form" name="e" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            name="name"
            value={item.name}
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            value={item.calorie}
            id="calorie"
            label="Calorie"
            onChange={handleChange}
            name="calorie"
          />
        </Grid>
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            id="eating_time"
            label="Eating Time"
            name="eating_time"
            value={item.eating_time}
            onChange={handleDateChange}
            maxDate={new Date()}
          />
          </LocalizationProvider>
        </Grid>
        
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add
      </Button>
      <Button
        href="/eatables"
        type="button"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default EatableForm
