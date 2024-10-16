import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, Product } from "./postSlice";

export type WishListItem = {
  item: Post;
};

interface WishListState {
  items: WishListItem[];
}

const storedWishListItems: WishListItem[] = JSON.parse(localStorage.getItem("wishlistItems") || "[]");

const initialState: WishListState = {
  items: storedWishListItems,
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addItemWishList: (state, action: PayloadAction<Post>) => {
      const newItem = action.payload;

      // Tìm xem item với id này đã tồn tại trong giỏ hàng chưa
      const existingItem = state.items.find((item) => item.item.id === newItem.id);

      if (!existingItem) {
        // check k co thi add vao
        state.items.push({ item: newItem });
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    removeItemWishList: (state, action: PayloadAction<Post>) => {
      const deleteItem = action.payload;
      state.items = state.items.filter((item) => item.item.id !== deleteItem.id);

      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    clearWishListWishList: (state) => {
      state.items = [];
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { addItemWishList, removeItemWishList, clearWishListWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
