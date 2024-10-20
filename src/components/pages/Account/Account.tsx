import Breadcrumb from "@common/Breadcrum";
import Title from "@common/Title";
import UserMenu from "@components/user/User";
import { useAppDispatch, useAppSelector } from "@redux/hook";
import { userProfile, updateUserProfile } from "@redux/slices/profileSlice"; // Importing the updateUserProfile action
import { BaseLinkGreen } from "@styles/button";
import { FormElement, Input } from "@styles/form";
import { Container } from "@styles/styles";
import { breakpoints, defaultTheme } from "@styles/themes/default";
import { UserContent, UserDashboardWrapper } from "@styles/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getAllDistrict, getAllProvince } from "@redux/slices/addressSlice";
import { uploadUserImage } from "@redux/slices/uploadAvatar";
import { toast } from "react-toastify";
import UserProfile from "../UserProfile/UserProfile";

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
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
  });
  console.log("dob", user?.dob);

  const [idProvice, setIdProvince] = useState({ id: "0", name: "chon tinh" });
  const [district, setDistrict] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getAllProvince());
    dispatch(getAllDistrict(idProvice.id));
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEditedUser({
        full_name: `${user.first_name || ""} ${user.last_name || ""}`,
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);

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
          toast.success("Cập nhật avatar thành công.");
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
    }
  };

  const handleSaveChanges = () => {
    if (user?.account_id) {
      let dobArray: [number, number, number] | undefined = undefined;

      if (typeof editedUser.dob === "string" && editedUser.dob.trim() !== "") {
        // Check if dob is a non-empty string
        const dobParts = editedUser.dob.split("-"); // Split the string by '-'
        if (dobParts.length === 3) {
          const [year, month, day] = dobParts.map((part) => parseInt(part, 10));

          // Validate the parsed values
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            dobArray = [year, month, day];
          }
        }
      }

      // Example usage:
      console.log(dobArray);

      // Split full_name into first_name and last_name
      const [firstName, ...lastName] = editedUser.full_name.split(" ");

      dispatch(
        updateUserProfile({
          accountId: user.account_id,
          first_name: firstName,
          last_name: lastName.join(" "), // Join remaining parts as the last name
          email: editedUser.email,
          phone: editedUser.phone,
          dob: user.dob,
          gender: editedUser.gender,
          address: editedUser.address,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Cập nhật thông tin thành công");
          setEditMode(false);
        })
        .catch((error) => {
          toast.error("Cập nhật thông tin thất bại");
          console.error(error);
        });
      dispatch(userProfile());
    }
  };

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
                    />
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="phone" className="form-label font-semibold text-base">
                    Số điện thoại
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      id="phone"
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
                  <label htmlFor="dob" className="form-label font-semibold text-base">
                    Ngày sinh
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      id="dob"
                      className="form-elem-control text-outerspace font-semibold"
                      value={
                        Array.isArray(editedUser.dob) && editedUser.dob.length === 3
                          ? `${editedUser.dob[0]}-${String(editedUser.dob[1]).padStart(2, "0")}-${String(
                              editedUser.dob[2]
                            ).padStart(2, "0")}`
                          : ""
                      }
                      readOnly={!editMode}
                    />
                  </div>
                </FormElement>
                <FormElement className="form-elem">
                  <label htmlFor="gender" className="form-label font-semibold text-base">
                    Giới tính
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      id="gender"
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
                  <label htmlFor="address" className="form-label font-semibold text-base">
                    Địa chỉ
                  </label>
                  <div className="form-input-wrapper flex items-center">
                    <Input
                      type="text"
                      id="address"
                      className="form-elem-control text-outerspace font-semibold"
                      value={editedUser.address}
                      readOnly={!editMode}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                    <button type="button" className="form-control-change-btn" onClick={handleEditToggle}>
                      <ModeEditIcon />
                    </button>
                  </div>
                </FormElement>
              </div>
              <div className="flex w-full">
                {editMode && (
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-white bg-green-800 rounded-lg mt-5 ml-auto mr-12"
                    onClick={handleSaveChanges}
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
