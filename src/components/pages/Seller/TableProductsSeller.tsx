import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { getAllProductsByShopId, addProduct, ProductShop, ProductEdit, editPro } from "@redux/slices/productShopSlice"; // Thêm addProduct vào import
import { currencyFormat } from "@ultils/helper";
import { BaseButtonGreen } from "@styles/button";
import { Modal, ModalBody, ModalHeader } from "@components/atom/modal/Modal";
import { getAllCategory } from "@redux/slices/categorySlice";
import { uploadProductImage } from "@redux/slices/uploadImageProduct";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { log } from "console";
import { userProfile } from "@redux/slices/profileSlice";

export default function TableProductsSeller() {
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
          onClick={() => handleImageClick(params)}
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
      renderCell: (params) => (params.value === "ACTIVE" ? "Đã duyệt" : "Chờ xác nhận"),
    },
    {
      field: "category_name",
      headerClassName: "super-app-theme--header",
      headerName: "Loại",
      width: 180,
    },
    {
      field: "change",
      headerClassName: "super-app-theme--header",
      headerName: "Thay đổi",
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => {
            console.log(params.row);
            handleEditClick(params.row);
          }}
        >
          <EditIcon />
        </button>
      ),
    },
  ];
  const [addShow, setAddShow] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [uploadShow, setUploadShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    product_name: "",
    stock: 0,
    price: 0,
    categoryId: 0,
    description: "",
    image: "",
  });

  const dispatch = useAppDispatch();
  const shopId = useAppSelector((state) => state.profile.user?.shop_id);
  const category = useAppSelector((state) => state.category);
  const { products, loading, error } = useAppSelector((state) => state.productShop);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!shopId) {
      dispatch(userProfile());
    }
    if (shopId) {
      dispatch(getAllProductsByShopId(shopId));
    }
    dispatch(getAllCategory());
  }, [dispatch, shopId]);

  const handleAddShow = () => setAddShow(true);
  const handleEditShow = () => setEditShow(true);
  const handleAddClose = () => {
    setAddShow(false);
    setFormData({
      product_name: "",
      stock: 0,
      price: 0,
      categoryId: 0,
      description: "",
      image: "",
    });
  };
  const handleEditClose = () => {
    setEditShow(false);
    // setFormData({
    //   product_name: "",
    //   quantity: 0,
    //   price: 0,
    //   categoryId: 0,
    //   description: "",
    //   image: "",
    // });
  };
  const [selectedProduct, setSelectedProduct] = React.useState<ProductShop | null>(null);
  const [editProduct, setEditProduct] = React.useState<ProductEdit | null>(null);

  const handleEditClick = (product: ProductShop) => {
    setEditProduct({
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
    setEditShow(true);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (editProduct) {
      setEditProduct({
        ...editProduct,
        [name]: value,
      });
    }
  };
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e", editProduct);
    if (!editProduct || editProduct.product_id === undefined) {
      toast.error("Vui lòng chọn sản phẩm để chỉnh sửa.");
      return;
    }

    const productData = {
      product_name: editProduct.product_name,
      price: editProduct.price,
      description: editProduct.description,
      stock: editProduct.stock,
    };
    try {
      await dispatch(editPro({ productId: editProduct.product_id, productData }));

      if (shopId) {
        await dispatch(getAllProductsByShopId(shopId));
      }

      toast.success("Cập nhật sản phẩm thành công.");
      handleEditClose();
    } catch (error) {
      toast.error("Cập nhật sản phẩm thất bại. Vui lòng thử lại.");
    }
  };

  const handleImageClick = (params: any) => {
    setSelectedProductId(params.row.product_id);
    setUploadShow(true);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };
  const handleImageUpload = () => {
    if (imageFile && selectedProductId) {
      dispatch(uploadProductImage({ productId: selectedProductId, image: imageFile }))
        .unwrap()
        .then(() => {
          if (shopId) {
            dispatch(getAllProductsByShopId(shopId));
          }
          toast.success("Cập nhật ảnh sản phẩm thành công.");
          setUploadShow(false);
        })
        .catch((err) => {
          toast.error("Cập nhật ảnh thất bại.");
        });
    }
    setUploadShow(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Tạo đối tượng để gửi
    const productData = {
      description: formData.description,
      price: formData.price,
      image: formData.image,
      stock: formData.stock,
      categoryId: formData.categoryId,
      shopId: shopId || 0,
      product_name: formData.product_name,
    };

    await dispatch(addProduct(productData));
    if (shopId) {
      dispatch(getAllProductsByShopId(shopId));
    }
    toast.success("Thêm sản phẩm thành công.");
    handleAddClose();
  };

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
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <BaseButtonGreen onClick={handleAddShow}>Thêm sản phẩm</BaseButtonGreen>
      </Box>
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
        // onRowClick={handleRowClick}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
      {/* Modal them san pham */}
      <Modal show={addShow} onHide={handleAddClose} size={"sm"}>
        <ModalHeader content={"Thêm sản phẩm"} />
        <div>
          <ModalBody>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    id="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.stock}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type quantity"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Danh mục
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Chọn danh mục</option>
                    {category.categories?.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type description"
                  />
                </div>
              </div>
              <BaseButtonGreen type="submit">Thêm sản phẩm</BaseButtonGreen>
            </form>
          </ModalBody>
        </div>
      </Modal>
      {/* Modal edit san pham */}
      <Modal show={editShow} onHide={handleEditClose} size={"sm"}>
        <ModalHeader content={"Cập nhật sản phẩm"} />
        <div>
          <ModalBody>
            <form className="p-4 md:p-5" onSubmit={handleEditSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="product_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    id="product_name"
                    value={editProduct?.product_name}
                    onChange={handleEditChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={editProduct?.stock}
                    onChange={handleEditChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type quantity"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={editProduct?.price}
                    onChange={handleEditChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={editProduct?.description}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type description"
                  />
                </div>
              </div>
              <BaseButtonGreen type="submit">Cập nhật sản phẩm</BaseButtonGreen>
            </form>
          </ModalBody>
        </div>
      </Modal>
      {/* Modal them ảnh  */}
      <Modal show={uploadShow} onHide={() => setUploadShow(false)} size={"sm"}>
        <ModalHeader content={"Upload Ảnh"} />
        <div>
          <ModalBody>
            <div className="p-4 md:p-5">
              <div className="col-span-2">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ảnh sản phẩm
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 mb-6"
                  required
                />
              </div>
              <button
                onClick={handleImageUpload}
                type="button"
                className="py-3.5 px-7 text-base font-medium text-white bg-gray-800 rounded-lg border border-pink-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
              >
                Thay đổi ảnh
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </Box>
  );
}
