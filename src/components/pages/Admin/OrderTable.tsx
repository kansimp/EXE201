import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { currencyFormat } from "@ultils/helper";
import { BaseButtonGreen } from "@styles/button";
import { getAdminOrders, getSellerOrders } from "@redux/slices/orderSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID đặt hàng", width: 150, headerClassName: "super-app-theme--header" },
  {
    field: "product_name",
    headerClassName: "super-app-theme--header",
    headerName: "Tên sản phẩm",
    width: 330,
    renderCell: (params) => params.row.product_list.map((product: any) => product.product_name).join(", "),
  },
  {
    field: "address",
    headerClassName: "super-app-theme--header",
    headerName: "Địa chỉ",
    width: 290,
  },
  {
    field: "total_price",
    headerClassName: "super-app-theme--header",
    headerName: "Tổng tiền",
    width: 100,
    renderCell: (params) => currencyFormat(params.value),
  },
  {
    field: "status",
    headerClassName: "super-app-theme--header",
    headerName: "Trạng thái",
    width: 150,
    renderCell: (params) => (params.value === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"),
  },
  {
    field: "create_date",
    headerClassName: "super-app-theme--header",
    headerName: "Ngày",
    flex: 1,
  },
];

export default function OrderTable() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  const { orders, loading, error } = useAppSelector((state) => state.order);

  const rows = orders.map((order, index) => ({
    id: order.orderCode,
    product_list: order.product_list,
    address: order.address,
    total_price: order.total_price,
    status: order.status,
    create_date: order.create_date,
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
          "& .super-app-theme--header": {
            backgroundColor: "#2d3748",
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
    </Box>
  );
}
