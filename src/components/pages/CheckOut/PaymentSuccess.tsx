import styled from 'styled-components';
import { Container } from '@styles/styles';
import image from '@images/confirmed_img.svg';
import { BaseLinkGreen } from '@styles/button';
import { defaultTheme } from '@styles/themes/default';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/hook';
import { DataCheckOutSuccess, paymentSuccess } from '@redux/slices/paymentSlice';
import { useEffect } from 'react';

const ConfirmScreenWrapper = styled.main`
    margin: 24px 0;

    .confirm-img {
        width: 240px;
        overflow: hidden;
    }

    .confirm-msg {
        border: 2px solid ${defaultTheme.color_outerspace};
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const ConfirmScreen = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const k = location.search;
        const queryString = k.split('?')[1];
        const params = new URLSearchParams(queryString);
        const data: DataCheckOutSuccess = {
            id: params.get('id'),
            code: params.get('code'),
            status: params.get('status'),
            orderCode: params.get('orderCode'),
            cancel: params.get('cancel') === 'true',
        };
        dispatch(paymentSuccess(data));
    }, []);
    return (
        <ConfirmScreenWrapper className="page-py-spacing">
            <Container>
                <div className="confirm-content flex items-center justify-center flex-col">
                    <div className="confirm-img">
                        <img src={image} alt="" className="object-fit-cover" />
                    </div>
                    <div className="confirm-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl font-semibold text-outerspace">Bạn Đã Đặt Hàng Thành Công</p>
                        <BaseLinkGreen
                            onClick={async () => {
                                await localStorage.removeItem('cartItems');
                                window.location.href = '/';
                            }}
                        >
                            Tiếp Tục Mua Hàng
                        </BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </ConfirmScreenWrapper>
    );
};

export default ConfirmScreen;
