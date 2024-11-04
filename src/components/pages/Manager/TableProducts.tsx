import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { approveProduct, getAllProducts, Product } from "@redux/slices/productSlice";
import { currencyFormat } from "@ultils/helper";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, ModalBody, ModalHeader } from "@components/atom/modal/Modal";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  { field: "id", headerName: "STT", width: 90, headerClassName: "super-app-theme--header" },
  {
    field: "image",
    headerClassName: "super-app-theme--header",
    headerName: "Ảnh",
    width: 150,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="product"
        style={{ width: "55px", height: "55px", paddingBottom: "5px", objectFit: "cover", borderRadius: "8px" }}
      />
    ),
  },
  {
    field: "product_name",
    headerClassName: "super-app-theme--header",
    headerName: "Tên sản phẩm",
    width: 250,
  },
  {
    field: "price",
    headerClassName: "super-app-theme--header",
    headerName: "Giá",
    width: 150,
  },
  {
    field: "stock",
    headerClassName: "super-app-theme--header",
    headerName: "Số lượng",
    width: 150,
  },
  {
    field: "status",
    headerClassName: "super-app-theme--header",
    headerName: "Trạng thái",
    width: 150,
    renderCell: (params) => (params.value === "PENDING" ? "Chờ xác nhận" : "Đã duyệt"),
  },
  {
    field: "category_name",
    headerClassName: "super-app-theme--header",
    headerName: "Loại",
    width: 180,
  },
  //   {
  //     field: "change",
  //     headerClassName: "super-app-theme--header",
  //     headerName: "Thay đổi",
  //     width: 100,
  //     renderCell: (params) => (
  //       <button
  //         onClick={() => {
  //           console.log(params.row);
  //           handleEditClick(params.row);
  //         }}
  //       >
  //         <EditIcon />
  //       </button>
  //     ),
  //   },
];

export default function DataGridDemo() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "STT", width: 90, headerClassName: "super-app-theme--header" },
    {
      field: "image",
      headerClassName: "super-app-theme--header",
      headerName: "Ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="product"
          style={{ width: "55px", height: "55px", paddingBottom: "5px", objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      field: "product_name",
      headerClassName: "super-app-theme--header",
      headerName: "Tên sản phẩm",
      width: 190,
    },
    {
      field: "price",
      headerClassName: "super-app-theme--header",
      headerName: "Giá",
      width: 130,
    },
    {
      field: "stock",
      headerClassName: "super-app-theme--header",
      headerName: "Số lượng",
      width: 110,
    },
    {
      field: "shop_name",
      headerClassName: "super-app-theme--header",
      headerName: "Shop",
      width: 150,
    },

    {
      field: "category_name",
      headerClassName: "super-app-theme--header",
      headerName: "Loại",
      width: 150,
    },
    {
      field: "status",
      headerClassName: "super-app-theme--header",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        switch (params.value) {
          case "PENDING":
            return "Chờ xác nhận";
          case "REJECTED":
            return "Từ chối";
          case "ACTIVE":
            return "Đã duyệt";
          case "CLOSED":
            return "Đã đóng";
          default:
            return "Không xác định";
        }
      },
    },
    {
      field: "change",
      headerClassName: "super-app-theme--header",
      headerName: "Thay đổi",
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => {
            handleSelectClick(params.row);
          }}
        >
          <EditIcon />
        </button>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const products = useAppSelector((state) => state.product.products);
  const rows = products.map((product, index) => ({
    id: index + 1,
    image: product.image,
    product_name: product.product_name,
    price: currencyFormat(product.price),
    status: product.status,
    category_name: product.category_name,
    product_id: product.product_id,
    stock: product.stock,
    description: product.description,
    shop_name: product.shop_name,
  }));
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [uploadShow, setUploadShow] = React.useState(false);
  const handleSelectClick = (product: Product) => {
    if (product.status === "CLOSED") {
      toast.warning("Sản phẩm đã bị đóng.");
    } else if (product.status === "REJECTED") {
      toast.warning("Sản phẩm đã bị từ chối.");
    } else {
      setSelectedProduct(product);
      setUploadShow(true);
    }
  };

  const handleApprove = (status: "REJECTED" | "ACTIVE" | "CLOSED") => {
    if (selectedProduct) {
      dispatch(approveProduct({ productId: selectedProduct.product_id, status }))
        .unwrap()
        .then(() => {
          dispatch(getAllProducts());
          toast.success("Cập nhật trạng thái sản phẩm thành công.");
          setUploadShow(false);
        })
        .catch((error) => {
          console.error("Failed to update product status:", error);
        });
    }
  };

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
      <Modal show={uploadShow} onHide={() => setUploadShow(false)} size="sm">
        <ModalHeader content="Thay đổi trạng thái" />
        <ModalBody>
          <div className="p-4 text-center">
            <h3 className="mb-5 text-lg font-normal text-black-60">Chọn trạng thái cho sản phẩm này</h3>
            {selectedProduct?.status === "PENDING" ? (
              <>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => handleApprove("REJECTED")}
                >
                  Từ chối
                </button>
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 ms-3 text-center"
                  onClick={() => handleApprove("ACTIVE")}
                >
                  Duyệt
                </button>
              </>
            ) : (
              <button
                type="button"
                className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={() => handleApprove("CLOSED")}
              >
                Đóng
              </button>
            )}
          </div>
        </ModalBody>
      </Modal>
    </Box>
  );
}
