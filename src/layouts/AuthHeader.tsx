import styled from "styled-components";
import { BaseLinkGreen, BaseLinkOutlineDark } from "styles/button";
import { HeaderMainWrapper, SiteBrandWrapper } from "styles/header";
import { Container } from "styles/styles";
import { breakpoints } from "styles/themes/default";
import Souvi from "../assets/images/souvi.png";

const ButtonGroupWrapper = styled.div`
  gap: 8px;
  @media (max-width: ${breakpoints.sm}) {
    button,
    a {
      min-width: 100px;
    }
  }
`;

const AuthHeader = () => {
  return (
    <HeaderMainWrapper className="flex items-center">
      <Container>
        <div className="header-wrap flex items-center justify-between">
          <SiteBrandWrapper to="/" className="inline-flex">
            <div className="brand-img-wrap flex items-center justify-center">
              <img className="site-brand-img" src={Souvi} alt="" />
            </div>
            <span className="site-brand-text">SouVI</span>
          </SiteBrandWrapper>
          <div className="flex items-center">
            <ButtonGroupWrapper className="flex items-center">
              <BaseLinkOutlineDark to="/sign_up">Trang Chủ</BaseLinkOutlineDark>
            </ButtonGroupWrapper>
          </div>
        </div>
      </Container>
    </HeaderMainWrapper>
  );
};

export default AuthHeader;
