import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'STT', width: 90, headerClassName: 'super-app-theme--header' },
    {
        field: 'image',
        headerClassName: 'super-app-theme--header',
        headerName: 'Ảnh',
        width: 150,
        editable: true,
    },
    {
        field: 'product_name',
        headerClassName: 'super-app-theme--header',
        headerName: 'Tên sản phẩm',
        width: 150,
        editable: true,
    },
    {
        field: 'shop_name',
        headerClassName: 'super-app-theme--header',
        headerName: 'Tên cửa hàng',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerClassName: 'super-app-theme--header',
        headerName: 'Giá',
        flex: 1,
        editable: true,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    {
        id: 2,
        lastName:
            'LannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannisterLannister',
        firstName: 'Cersei',
        age: 31,
    },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                sx={{
                    '& .super-app-theme--header': {
                        backgroundColor: '#2d3748',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                }}
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnFilter
            />
        </Box>
    );
}
