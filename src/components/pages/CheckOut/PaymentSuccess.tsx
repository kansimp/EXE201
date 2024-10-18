import styled from 'styled-components';
import { Container } from '@styles/styles';
import image from '@images/confirmed_img.svg';
import { BaseLinkGreen } from '@styles/button';
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

const ConfirmScreen = () => {
    const navigate = useNavigate();
    return (
        <ConfirmScreenWrapper className="page-py-spacing">
            <Container>
                <div className="confirm-content flex items-center justify-center flex-col">
                    <div className="confirm-img">
                        <img src={image} alt="" className="object-fit-cover" />
                    </div>
                    <div className="confirm-msg w-full flex flex-col justify-center items-center">
                        <p className="text-4xl font-semibold text-outerspace">Bạn Đã Đặt Hàng Thành Công</p>
                        <BaseLinkGreen onClick={() => navigate('/')}>Tiếp Tục Mua Hàng</BaseLinkGreen>
                    </div>
                </div>
            </Container>
        </ConfirmScreenWrapper>
    );
};

export default ConfirmScreen;