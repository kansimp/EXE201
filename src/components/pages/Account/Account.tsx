import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { userProfile } from "@redux/slices/profileSlice";
import { BaseLinkGreen } from "@styles/button";
import { FormElement, Input } from "@styles/form";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HomeIcon from "@mui/icons-material/Home";
import { getAllDistrict, getAllProvince } from "@redux/slices/addressSlice";
import { uploadUserImage } from "@redux/slices/uploadAvatar";

const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Home",
    link: "/",
  },
  { label: "Account", link: "/account" },
];

const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);
  const listProvince = useAppSelector((state) => state.address.listProvince);
  const listDistrict = useAppSelector((state) => state.address.listDistrict);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    full_name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    address: user?.address || "",
  });
  const [idProvice, setIdProvince] = useState({ id: "0", name: "chon tinh" });
  const [district, setDistrict] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  useEffect(() => {
    dispatch(getAllProvince());
    dispatch(getAllDistrict(idProvice.id));
    dispatch(userProfile());
  }, [dispatch]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageUpload = () => {
    if (imageFile && user?.account_id) {
      dispatch(uploadUserImage({ userId: user.account_id, image: imageFile }))
        .unwrap()
        .then(() => {
          alert("Image uploaded successfully!");
        });
    }
  };
  const handleInputChange = (field: string, value: string) => {
    if (field === "full_name") {
      const [firstName, ...lastName] = value.split(" ");
      setEditedUser((prev) => ({
        ...prev,
        first_name: firstName,
        last_name: lastName.join(" "),
        full_name: value,
      }));
    } else {
      setEditedUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  // const handleSaveChanges = () => {
  //   dispatch(updateUserProfile(editedUser));
  //   setEditMode(false);
  // };

  return (
    <AccountScreenWrapper className="page-py-spacing mb-8 mt-8">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <div className="flex flex-col items-center space-y-6 mb-5">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-gray-400 dark:ring-indigo-500"
                src={user?.avatar as string}
                alt="Bordered avatar"
              />
              <div className="flex flex-col space-y-3">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button
                  onClick={handleImageUpload}
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-white bg-gray-800 rounded-lg border border-pink-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
                >
                  Thay đổi ảnh
                </button>
              </div>
            </div>
            <form>
              <div className="form-wrapper mb-12">
                <FormElement className="form-elem">
                  <label htmlFor="first_name" className="form-label font-semibold text-base">
                    Tên
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      id="first_name"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.full_name}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                {/* Các phần tử form khác được cấu trúc tương tự */}
                <FormElement className="form-elem">
                  <label htmlFor="email" className="form-label font-semibold text-base">
                    Email
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="email"
                      id="email"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.email}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Số điện thoại
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.phone}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Ngày sinh
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={
                        user?.dob
                          ? `${user.dob[0]}-${String(user.dob[1]).padStart(2, "0")}-${String(user.dob[2]).padStart(
                              2,
                              "0"
                            )}`
                          : ""
                      }
                      readOnly
                    />
                    <button type="button" className="form-control-change-btn">
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Giới Tính
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.gender}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Tên Đường , Số nhà
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.address}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Tỉnh
                  </label>
                  <select
                    id="Tinh"
                    value={JSON.stringify(idProvice)}
                    onChange={(e) => {
                      setIdProvince(JSON.parse(e.target.value));
                    }}
                    className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Chọn Tỉnh ...</option>
                    {listProvince.map((province, index) => {
                      return (
                        <option key={index} value={JSON.stringify({ id: province.id, name: province.name })}>
                          {province.name}
                        </option>
                      );
                    })}
                  </select>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="" className="form-label font-semibold text-base">
                    Huyện
                  </label>
                  <select
                    id="huyen"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                    className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Chọn Huyện ...</option>
                    {listDistrict.map((district, index) => {
                      return (
                        <option key={index} value={district.name}>
                          {district.name}
                        </option>
                      );
                    })}
                  </select>
                </FormElement>
              </div>

              <div className="flex w-full">
                {editMode && (
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-white bg-green-800 rounded-lg mt-5 ml-auto mr-12"
                    // onClick={handleSaveChanges}
                  >
                    Lưu thay đổi
                  </button>
                )}
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
