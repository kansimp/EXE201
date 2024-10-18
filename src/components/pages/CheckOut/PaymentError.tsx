import styled from 'styled-components';
import { Container } from '@styles/styles';
import image from '@images/errorPayment.png';
import { BaseLinkRed } from '@styles/button';
import { defaultTheme } from '@styles/themes/default';
import { useNavigate } from 'react-router-dom';

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

const ErrorScreen = () => {
    const navigate = useNavigate();
    return (
        <ConfirmScreenWrapper className="page-py-spacing">
            <Container>
                <div className="confirm-content flex items-center justify-center flex-col">
                    <div className="confirm-img">
                        <img src={image} alt="" className="object-fit-cover" />
                    </div>
                    <div className="confirm-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl font-semibold text-outerspace">Thanh Toán Thất Bại</p>
                        <BaseLinkRed className="bg-red-500" onClick={() => navigate('/checkout')}>
                            Thanh Toán Lại
                        </BaseLinkRed>
                    </div>
                </div>
            </Container>
        </ConfirmScreenWrapper>
    );
};

export default ErrorScreen;