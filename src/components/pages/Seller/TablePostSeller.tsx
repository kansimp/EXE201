import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { getAllProductsByShopId } from "@redux/slices/productShopSlice";
import { BaseButtonGreen } from "@styles/button";
import { addPost, getAllPostsByShopId } from "@redux/slices/postShopSlice";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "@components/atom/modal/Modal";
import { toast } from "react-toastify";
import { userProfile } from "@redux/slices/profileSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "STT", width: 90, headerClassName: "super-app-theme--header" },
  {
    field: "title",
    headerClassName: "super-app-theme--header",
    headerName: "Tên bài",
    width: 750,
  },
  {
    field: "status",
    headerClassName: "super-app-theme--header",
    headerName: "Trạng thái",
    width: 150,
    renderCell: (params) => (params.value === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"),
  },
  {
    field: "createdDate",
    headerClassName: "super-app-theme--header",
    headerName: "Ngày",
    flex: 1,
  },
];

export default function TablePostSeller() {
  const shopId = useAppSelector((state) => state.profile.user?.shop_id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addShow, setAddShow] = React.useState(false);
  const [selectedProductIds, setSelectedProductIds] = React.useState<number[]>([]);
  const [formData, setFormData] = React.useState({
    title: "",
    shopId: shopId,
    description: "",
  });

  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => {
    setAddShow(false);
    setFormData({
      title: "",
      shopId: shopId,
      description: "",
    });
    setSelectedProductIds([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      products: selectedProductIds,
    };
    console.log("Dữ liệu gửi đi:", dataToSend);
    await dispatch(addPost(dataToSend));
    toast.success("Bài viết đã được upload thành công ");
    if (shopId) {
      dispatch(getAllPostsByShopId({ shopId: shopId, page: 0 }));
    }
    handleAddClose();
  };

  React.useEffect(() => {
    if (!shopId) {
      dispatch(userProfile());
    }
    if (shopId) {
      dispatch(getAllPostsByShopId({ shopId: shopId, page: 0 }));
      dispatch(getAllProductsByShopId(shopId));
    }
  }, [dispatch, shopId]);

  const listPost = useAppSelector((state) => state.postShop.listPostByShop);

  const rows = listPost.map((post, index) => ({
    id: index + 1,
    postID: post.id,
    title: post.title,
    status: post.status,
    createdDate: post.createdDate,
  }));

  const handleRowClick = (params: any) => {
    const postId = params.row.postID;
    navigate(`/posts/${postId}/products`);
  };

  const product = useAppSelector((state) => state.productShop.products);
  const activeProducts = product.filter((p) => p.status === "ACTIVE");

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <BaseButtonGreen onClick={handleAddShow}>Thêm bài viết</BaseButtonGreen>
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
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
      />
      <Modal show={addShow} onHide={handleAddClose} size={"sm"}>
        <ModalHeader content={"Thêm sản phẩm"} />
        <div>
          <ModalBody>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tên tiêu đề
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tiêu đề"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                    <div className="p-3">Chọn sản phẩm</div>
                    <ul
                      className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownSearchButton"
                    >
                      {activeProducts.map((product, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              checked={selectedProductIds.includes(product.product_id)}
                              onChange={() => handleCheckboxChange(product.product_id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {product.product_name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    placeholder="Viết mô tả"
                  />
                </div>
              </div>
              <BaseButtonGreen type="submit">Thêm bài viết</BaseButtonGreen>
            </form>
          </ModalBody>
        </div>
      </Modal>
    </Box>
  );
}
