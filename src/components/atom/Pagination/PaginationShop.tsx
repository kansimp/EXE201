import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { getAllPostsByShopId } from "@redux/slices/postShopSlice";

export default function PaginationControlledShop() {
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const total_page = useAppSelector((state) => state.postShop.total_pages);
  const shopId = useAppSelector((state) => state.postDetail.postDetail?.products[0].shopId);
  useEffect(() => {
    dispatch(getAllPostsByShopId({ shopId: shopId, page: page - 1 }));
  }, []);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getAllPostsByShopId({ shopId: shopId, page: value - 1 }));
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={total_page} page={page} onChange={handleChange} />
    </Stack>
  );
}
