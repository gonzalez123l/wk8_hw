import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { CarForm } from '../CarForm'


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
    editable: true,
  },
  {
    field: 'make',
    headerName: 'Make',
    width: 150,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'color',
    headerName: 'Color',
    width: 110,
    editable: true,
  },

];

interface gridData {
  data: {
    id?: string;
  }
}

export const DataTable = () => {

  const { carData, getData } = useGetData();
  const [open, setOpen] = useState(false);
  const [gridData, setData] = useState<GridRowSelectionModel>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData)



  //conditionally render datatable if we have an authenticated user
  const MyAuth = localStorage.getItem('myAuth');
  console.log(MyAuth)
  if (MyAuth == 'true'){
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Cars in Inventory</h2>
        <DataGrid
          rows={carData}
          columns={columns}
          initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    },
                },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel) }}
          {...carData}
        />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
        {/* Dialog Pop up for Updating a Car */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Car</DialogTitle>
          <DialogContent>
            <DialogContentText>Car id: {gridData[0]}</DialogContentText>
            <CarForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color="primary">Done</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  } else {
    return(
        // return does not render datatable if user is authenticated
        <div>
          <h3>Plese Sign in to view Your Collection</h3>
        </div>
  )}
}