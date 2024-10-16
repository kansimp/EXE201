import styled from 'styled-components';
import { BaseButtonGreen } from '@styles/button';
import { breakpoints, defaultTheme } from '@styles/themes/default';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hook';
import { CartItem } from '@redux/slices/cartSlice';
import { currencyFormat } from '@ultils/helper';

const CartSummaryWrapper = styled.div`
    background-color: ${defaultTheme.color_flash_white};
    padding: 16px;

    .checkout-btn {
        min-width: 100%;
    }

    .summary-list {
        padding: 20px;

        @media (max-width: ${breakpoints.xs}) {
            padding-top: 0;
            padding-right: 0;
            padding-left: 0;
        }

        .summary-item {
            margin: 6px 0;

            &:last-child {
                margin-top: 20px;
                border-top: 1px dashed ${defaultTheme.color_sea_green};
                padding-top: 10px;
            }
        }
    }
`;
type CartSummaryProps = {
    totalPrice: number;
};
// interface CartCheckOutType extends CartItem {
//     subTotal: number;
// }
const CartSummary = ({ totalPrice }: CartSummaryProps) => {
    // const listCart: CartItem[] = useAppSelector((state) => state.cart.items);
    // const listCartCheckOut: CartCheckOutType[] = listCart.map((cart): CartCheckOutType => {
    //     return { ...cart, subTotal: cart.quantity * cart.item.price };
    // });
    return (
        <CartSummaryWrapper>
            <ul className="summary-list">
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng Phụ</span>
                    <span className="font-medium text-outerspace">{currencyFormat(totalPrice)}</span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Phí Vận Chuyển</span>
                    <span className="font-medium text-outerspace">0</span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng</span>
                    <span className="summary-item-value font-bold text-outerspace">{currencyFormat(totalPrice)}</span>
                </li>
            </ul>
            <Link to={'/checkout'}>
                <BaseButtonGreen type="submit" className="checkout-btn">
                    Tiến hành thanh toán
                </BaseButtonGreen>
            </Link>
        </CartSummaryWrapper>
    );
};

export default CartSummary;
