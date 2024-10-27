import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import myAxios from '@setup/axiosConfig';

type ChartProp = {
    startDay: string | null;
    endDay: string | null;
};
type ChartProp1 = {
    startDay: string | null;
    endDay: string | null;
    sellerId: string | null;
};
type ChartPropSeller = {
    startDay: string | null;
    endDay: string | null;
    id: string | null;
    shopId: number | null;
};
interface GroupedOrder {
    day: string;
    total_price: number;
}
export const getAllOrder = createAsyncThunk('post/getAllOrder', async ({ startDay, endDay }: ChartProp) => {
    const response = await myAxios.get(
        `https://souvi-be-v1.onrender.com/order/admin/details?pageNo=0&pageSize=1000&sortBy=SORT_BY_DATE_DESC&startDate=${startDay}&endDate=${endDay}`,
    );
    const listOrder = response.data.content
        .filter((order: Order) => order.status === 'PAID')
        .filter(
            (order: Order, index: number, self: Order[]) =>
                index === self.findIndex((o) => o.orderCode === order.orderCode),
        );
    const groupOrdersByDay = (orders: Order[]): GroupedOrder[] => {
        return orders.reduce((acc: GroupedOrder[], order) => {
            const day = order.create_date.split(' ')[0];
            const existingDay = acc.find((group) => group.day === day);
            if (existingDay) {
                existingDay.total_price += order.total_price;
            } else {
                acc.push({ day, total_price: order.total_price });
            }
            return acc;
        }, []);
    };
    const groupedOrders = groupOrdersByDay(listOrder);
    const getDatesInRange = (startDate: string, endDate: string): string[] => {
        const dateArray: string[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dateArray.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
    };

    const fillMissingDates = (groupedOrders: GroupedOrder[], startDate: string, endDate: string): GroupedOrder[] => {
        const dateRange = getDatesInRange(startDate, endDate);
        const orderMap = new Map(groupedOrders.map((order) => [order.day, order.total_price]));
        return dateRange.map((day) => ({
            day,
            total_price: orderMap.get(day) || 0,
        }));
    };
    const result = fillMissingDates(groupedOrders, startDay as string, endDay as string);
    return result;
});
export const getAllOrderSeller = createAsyncThunk(
    'post/getAllOrderSeller',
    async ({ startDay, endDay, id, shopId }: ChartPropSeller) => {
        const response = await myAxios.get(
            `https://souvi-be-v1.onrender.com/order/seller/details?pageNo=0&pageSize=1000&sortBy=SORT_BY_DATE_DESC&sellerId=${id}&startDate=${startDay}&endDate=${endDay}`,
        );
        const listOrder = response.data.content
            .filter((order: Order) => order.status === 'PAID' && order.shop_id === shopId)
            .filter(
                (order: Order, index: number, self: Order[]) =>
                    index === self.findIndex((o) => o.orderCode === order.orderCode),
            );
        const groupOrdersByDay = (orders: Order[]): GroupedOrder[] => {
            return orders.reduce((acc: GroupedOrder[], order) => {
                const day = order.create_date.split(' ')[0];
                const existingDay = acc.find((group) => group.day === day);
                if (existingDay) {
                    existingDay.total_price += order.total_price;
                } else {
                    acc.push({ day, total_price: order.total_price });
                }
                return acc;
            }, []);
        };
        const groupedOrders = groupOrdersByDay(listOrder);
        const getDatesInRange = (startDate: string, endDate: string): string[] => {
            const dateArray: string[] = [];
            const currentDate = new Date(startDate);
            while (currentDate <= new Date(endDate)) {
                dateArray.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dateArray;
        };

        const fillMissingDates = (
            groupedOrders: GroupedOrder[],
            startDate: string,
            endDate: string,
        ): GroupedOrder[] => {
            const dateRange = getDatesInRange(startDate, endDate);
            const orderMap = new Map(groupedOrders.map((order) => [order.day, order.total_price]));
            return dateRange.map((day) => ({
                day,
                total_price: orderMap.get(day) || 0,
            }));
        };
        const result = fillMissingDates(groupedOrders, startDay as string, endDay as string);
        return result;
    },
);
export const getDashBoard = createAsyncThunk('dasboard/getDashBoard', async ({ startDay, endDay }: ChartProp) => {
    const response = await myAxios.get(
        `https://souvi-be-v1.onrender.com/order/admin/registration-details?startDate=${startDay}&endDate=${endDay}`,
    );
    return response.data;
});
export const getDashBoardSeller = createAsyncThunk(
    'dasboard/getDashBoardSeller',
    async ({ startDay, endDay, sellerId }: ChartProp1) => {
        const response = await myAxios.get(
            `https://souvi-be-v1.onrender.com/order/seller/sale-details?startDate=${startDay}&endDate=${endDay}&sellerId=${sellerId}`,
        );
        return response.data;
    },
);
interface DataStatistics {
    total_products: number | undefined;
    product_percentage_changes: number | undefined;
    total_sales: number | undefined;
    sale_percentage_changes: number | undefined;
    total_customers: number | undefined;
    customers_percentage_changes: number | undefined;
    total_commission: number | undefined;
    commission_percentage_changes: number | undefined;
}
interface DataStatisticsSeller {
    total_products: number | undefined;
    total_sales: number | undefined;
    sale_percentage_changes: number | undefined;
    total_net_sales: number | undefined;
    net_sale_percentage_changes: number | undefined;
    pending_products: number | undefined;
    cancelled_products: number | undefined;
}

interface Product {
    quantity: number;
    image: string;
    product_id: number;
    product_name: string;
    unit_price: number;
    line_total: number;
}

export type Order = {
    address: string;
    description: string;
    customer_order_id: number;
    orderCode: string;
    buyer_Id: string;
    buyer_name: string;
    customer_name: string;
    total_price: number;
    status: string;
    create_date: string;
    product_list: Product[];
    shop_id: number;
    shop_name: string;
    payment_id: string | null;
    payment_code: string | null;
    payment_method: string;
};

type ChartState = {
    isLoading: boolean;
    isLoadingSeller: boolean;
    listOrder: GroupedOrder[];
    listOrderSeller: GroupedOrder[];
    allDashboard: DataStatistics | null | undefined;
    allDashboardSeller: DataStatisticsSeller | null | undefined;
    isError: boolean;
};

const initialState: ChartState = {
    isLoading: false,
    isLoadingSeller: false,
    listOrder: [],
    listOrderSeller: [],
    isError: false,
    allDashboard: null,
    allDashboardSeller: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllOrder.fulfilled, (state, action: PayloadAction<GroupedOrder[]>) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrder = action.payload;
            })
            .addCase(getAllOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(getAllOrderSeller.pending, (state) => {
                state.isLoadingSeller = true;
                state.isError = false;
            })
            .addCase(getAllOrderSeller.fulfilled, (state, action: PayloadAction<GroupedOrder[]>) => {
                state.isLoadingSeller = false;
                state.isError = false;
                state.listOrderSeller = action.payload;
            })
            .addCase(getAllOrderSeller.rejected, (state) => {
                state.isLoadingSeller = false;
                state.isError = true;
            });
        builder
            .addCase(getDashBoard.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDashBoard.fulfilled, (state, action: PayloadAction<DataStatistics>) => {
                state.isLoading = false;
                state.isError = false;
                state.allDashboard = action.payload;
            })
            .addCase(getDashBoard.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
        builder
            .addCase(getDashBoardSeller.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getDashBoardSeller.fulfilled, (state, action: PayloadAction<DataStatisticsSeller>) => {
                state.isLoading = false;
                state.isError = false;
                state.allDashboardSeller = action.payload;
            })
            .addCase(getDashBoardSeller.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});
export default dashboardSlice.reducer;
