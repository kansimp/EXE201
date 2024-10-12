// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu CartItem
interface CartItem {
    id: string;
    quantity: number;
}
interface CartPayload {
    id: string;
}

// Định nghĩa kiểu cho state
interface CartState {
    items: CartItem[];
}

// Lấy dữ liệu từ localStorage nếu có
const storedCartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

// Khởi tạo state ban đầu
const initialState: CartState = {
    items: storedCartItems,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartPayload>) => {
            const newItem = action.payload;

            // Tìm xem item với id này đã tồn tại trong giỏ hàng chưa
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (existingItem) {
                // Nếu đã tồn tại, cộng số lượng thêm
                existingItem.quantity += 1;
            } else {
                // Nếu chưa tồn tại, thêm item mới vào giỏ hàng
                state.items.push({ id: newItem.id, quantity: 1 });
            }

            // Lưu lại vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItem: (state, action: PayloadAction<CartPayload>) => {
            const deleteItem = action.payload;
            const existingItem = state.items.find((item) => item.id === deleteItem.id);
            if (existingItem) {
                // Nếu đã tồn tại, cộng số lượng thêm
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== existingItem.id);
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Cập nhật lại localStorage
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems'); // Xóa dữ liệu trong localStorage
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
