import Breadcrumb from "@common/Breadcrumb";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { currencyFormat } from "@components/utils/helper";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { addItem, CartItem } from "@redux/slices/cartSlice";
import { removeItemWishList, WishListItem } from "@redux/slices/wishlistSlice";
import { BaseLinkBlack, BaseLinkGreen } from "@styles/button";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import { wishlistData } from "data/FooterData";
import styled from "styled-components";
import WishListEmptyScreen from "./WishListEmptyScreen";
import { Link } from "react-router-dom";

const WishListScreenWrapper = styled.main`
  .wishlist {
    gap: 20px;
  }
`;

const WishItemWrapper = styled.div`
  gap: 30px;
  max-width: 900px;
  position: relative;

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 20px;
  }

  @media (max-width: ${breakpoints.lg}) {
    column-gap: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    flex-direction: column;
    gap: 12px;
  }

  .wish-item-img {
    column-gap: 30px;

    @media (max-width: ${breakpoints.xl}) {
      column-gap: 20px;
    }

    @media (max-width: ${breakpoints.lg}) {
      column-gap: 16px;
    }

    &-wrapper {
      min-width: 110px;
      width: 110px;
      border-radius: 4px;
      overflow: hidden;

      @media (max-width: ${breakpoints.xs}) {
        min-width: 100%;
        height: 180px;

        img {
          object-position: top;
        }
      }
    }

    .wish-remove-btn {
      width: 20px;
      min-width: 20px;
      height: 20px;
      border: 1px solid ${defaultTheme.color_outerspace};
      border-radius: 50%;
      font-size: 10px;
      margin-top: auto;
      margin-bottom: auto;

      &:hover {
        background-color: ${defaultTheme.color_gray};
        color: ${defaultTheme.color_white};
        border-color: ${defaultTheme.color_gray};
      }

      @media (max-width: ${breakpoints.sm}) {
        position: absolute;
        right: -10px;
        top: -10px;
      }

      @media (max-width: ${breakpoints.xs}) {
        right: 6px;
        top: 6px;
        background-color: ${defaultTheme.color_jet};
        color: ${defaultTheme.color_white};
      }
    }
  }

  .wish-item-info {
    flex: 1;

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 8px;
    }

    &-l {
      row-gap: 4px;

      ul {
        row-gap: 4px;
        li {
          span {
            &:last-child {
              margin-left: 4px;
            }
          }
        }
      }
    }

    &-r {
      column-gap: 40px;

      @media (max-width: ${breakpoints.xl}) {
        column-gap: 20px;
      }

      @media (max-width: ${breakpoints.lg}) {
        flex-direction: column;
        align-items: flex-end;
        row-gap: 8px;
      }

      @media (max-width: ${breakpoints.sm}) {
        flex-direction: row;
        align-items: center;
      }

      .wish-item-price {
        @media (max-width: ${breakpoints.sm}) {
          order: 2;
        }
      }

      .wish-cart-btn {
        @media (max-width: ${breakpoints.sm}) {
          order: 1;
        }
      }
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Wishlist", link: "/wishlist" },
];

const WishListScreen = () => {
  const listWishList: WishListItem[] = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  if (listWishList.length <= 0) {
    return <WishListEmptyScreen />;
  }
  return (
    <WishListScreenWrapper className="page-py- mb-12">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Wishlist"} />
            <div className="wishlist grid">
              {listWishList?.map((wishlist) => {
                const prices = wishlist.item.products.map((product) => product.price);

                const highestPrice = Math.max(...prices);
                const lowestPrice = Math.min(...prices);
                return (
                  <WishItemWrapper className="wish-item flex" key={wishlist.item.id}>
                    <div className="wish-item-img flex items-stretch">
                      <button
                        type="button"
                        className="wish-remove-btn"
                        onClick={() => {
                          dispatch(removeItemWishList(wishlist.item));
                        }}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                      <Link to={`/product/${wishlist.item.id}`}>
                        <div className="wish-item-img-wrapper">
                          <img src={wishlist.item.products[0].image} className="object-fit-cover" alt="" />
                        </div>
                      </Link>
                    </div>
                    <div className="wish-item-info flex justify-between">
                      <div className="wish-item-info-l flex flex-col">
                        <p className="wish-item-title text-xl font-bold text-outerspace">{wishlist.item.title}</p>
                        <ul className="flex flex-col">
                          <li>
                            <span className="text-lg font-bold">Status:</span>
                            <span className="text-lg text-gray font-medium capitalize">{wishlist.item.status}</span>
                          </li>
                          <li>
                            <span className="text-lg font-bold">Shop:</span>
                            <span className="text-lg text-gray font-medium capitalize">
                              {wishlist.item.products[0].shop_name}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="wish-item-info-r flex items-center">
                        <span className="wish-item-price text-xl text-gray font-bold">
                          ₫{lowestPrice} - ₫{highestPrice}
                        </span>
                      </div>
                    </div>
                  </WishItemWrapper>
                );
              })}
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </WishListScreenWrapper>
  );
};

export default WishListScreen;
