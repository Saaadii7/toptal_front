import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Layout } from '../Layout';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import { all, destroy } from '../../services/eatable'

const formatDate = (date) => {
  return moment(date).format('MMM DD, YYYY hh:mm a')
}

const EatableTable = () => {
  const [eatables, seteatables] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [eatableId, setEatableId] = React.useState(null);

  useEffect(() => {
    async function fetchEatables() {
      let response = await all();
      seteatables(response.data)
    }
    fetchEatables()
  }, [])

  const deleteEatable = async () => {
    await destroy(eatableId)
    seteatables(eatables.filter(elem => elem.id !== eatableId))
    setOpen(false);
  }

  const openDeleteEatable = async (id) => {
    setEatableId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container spacing={1}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm to delete Eatable?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteEatable} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton color="primary" href="/eatables/new" aria-label="Add Eatable">
        <AddShoppingCartIcon />
      </IconButton>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Eating Time&nbsp;(date)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eatables.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.attributes.name}
                </TableCell>
                <TableCell align="right">{row.attributes.calorie}</TableCell>
                <TableCell align="right">{formatDate(row.attributes.eating_time)}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" href={`/eatables/${row.id}/edit`} aria-label="Edit Eatable">
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="Delete Eatable" onClick={()=>openDeleteEatable(row.id)}>
                    <DeleteIcon />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Layout(EatableTable);
