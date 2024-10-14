import styled from 'styled-components';
import { BaseButtonGreen } from '@styles/button';
import { breakpoints, defaultTheme } from '@styles/themes/default';

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
const CartSummary = ({ totalPrice }: CartSummaryProps) => {
    return (
        <CartSummaryWrapper>
            <ul className="summary-list">
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng Phụ</span>
                    <span className="font-medium text-outerspace">₫{totalPrice}</span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Phí Vận Chuyển</span>
                    <span className="font-medium text-outerspace">0</span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng</span>
                    <span className="summary-item-value font-bold text-outerspace">₫{totalPrice}</span>
                </li>
            </ul>
            <BaseButtonGreen type="submit" className="checkout-btn">
                Tiến hành thanh toán
            </BaseButtonGreen>
        </CartSummaryWrapper>
    );
};

export default CartSummary;
