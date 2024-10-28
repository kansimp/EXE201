import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { getAllUsers } from "@redux/slices/listUserSlice";

const columns: GridColDef[] = [
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "last_name", headerName: "Last Name", width: 150 },
  { field: "role_Name", headerName: "Role", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "address", headerName: "Address", width: 300 },
  { field: "phone", headerName: "Phone", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { loading, users, error } = useAppSelector((state: any) => state.listUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const rows = Array.isArray(users)
    ? users.map((user) => ({
        id: user.account_id,
        first_name: user.first_name,
        last_name: user.last_name,
        role_Name: user.role_Name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      }))
    : [];
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1976d2",
            color: "black",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#fff", // Customize the row background color
            "&:hover": {
              backgroundColor: "#e0e0e0", // Row background color on hover
            },
          },
        }}
      />
    </Paper>
  );
}
