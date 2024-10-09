import styled, { css } from 'styled-components';
import { defaultTheme } from './themes/default';

// Khai báo kiểu css chung cho các mũi tên
const commonArrowStyles = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: ${defaultTheme.color_sea_green};
    border: 3px solid ${defaultTheme.color_whitesmoke};

    svg {
        scale: 1.3;
        color: ${defaultTheme.color_white};
    }
`;

// Styled-component cho nút Next Arrow
export const CustomNextArrowWrapper = styled.button`
    ${commonArrowStyles}
    right: 0;
`;

// Styled-component cho nút Prev Arrow
export const CustomPrevArrowWrapper = styled.button`
    ${commonArrowStyles}
    left: 0;
`;
