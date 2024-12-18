import register from '@images/register.jpg';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProvince, getAllDistrict } from '../../../redux/slices/addressSlice';
import { createBuyer } from '../../../redux/slices/registerSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormGridWrapper, FormTitle } from 'styles/form_grid';
import { Container } from 'styles/styles';

const SignUpScreenWrapper = styled.section`
    form {
        margin-top: 40px;
        .form-elem-text {
            margin-top: -16px;
            display: block;
        }
    }

    .text-space {
        margin: 0 4px;
    }
`;

const initFormValue = {
    email: '',
    password: '',
    phone: '',
    role: 'BUYER',
    first_name: '',
    last_name: '',
    province: '',
    district: '',
    street: '',
};

// Check empty
const isEmptyValue = (value: string) => {
    return !value || value.trim().length < 1;
};

// Check email
const isEmailValid = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const isPhoneNumberValid = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
};
const isValidPassword = (password: string): boolean => {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự, chứa ít nhất một chữ cái viết hoa và một chữ số
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

export type RegisterType = {
    email: string;
    address: string;
    phone: string;
    password: string;
    role: 'BUYER';
    first_name: String;
    last_name: string;
};

const Register = () => {
    const dispatch = useAppDispatch();
    const listProvince = useAppSelector((state) => state.address.listProvince);
    const listDistrict = useAppSelector((state) => state.address.listDistrict);
    const isLoading = useAppSelector((state) => state.address.isLoading);
    const isError = useAppSelector((state) => state.address.isError);
    const isLoadingRegister = useAppSelector((state) => state.register.isLoading);
    const isErrorRegister = useAppSelector((state) => state.register.isError);
    const message = useAppSelector((state) => state.register.message);
    const [idProvice, setIdProvince] = useState({ id: '0', name: 'chon tinh' });
    const [district, setDistrict] = useState('0');
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllProvince());
        dispatch(getAllDistrict(idProvice.id));
    }, [idProvice.id]);

    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({
        email: '',
        password: '',
        phone: '',
        first_name: '',
        last_name: '',
        street: '',
        province: '',
        district: '',
    });

    // Xử lý validate
    const validateForm = () => {
        const errors = {
            email: '',
            password: '',
            phone: '',
            first_name: '',
            last_name: '',
            street: '',
            province: '',
            district: '',
        };
        let check = true;
        if (isEmptyValue(formValue.email)) {
            errors.email = 'Email không được bỏ trống !';
            check = false;
        } else if (!isEmailValid(formValue.email)) {
            errors.email = 'Vui lòng nhập đúng định dạng email !';
            check = false;
        }
        if (isEmptyValue(formValue.password)) {
            errors.password = 'Mật khẩu không được bỏ trống';
            check = false;
        } else if (!isValidPassword(formValue.password)) {
            errors.password = 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm một chữ cái viết hoa và một chữ số';
            check = false;
        }
        if (isEmptyValue(formValue.phone)) {
            errors.phone = 'Số điện thoại không được bỏ trống';
            check = false;
        } else if (!isPhoneNumberValid(formValue.phone)) {
            errors.phone = 'Vui lòng nhập đúng số điện thoại !';
            check = false;
        }
        if (isEmptyValue(formValue.first_name)) {
            errors.first_name = 'Họ và tên đệm không được bỏ trống !';
            check = false;
        }
        if (isEmptyValue(formValue.last_name)) {
            errors.last_name = 'Tên không được bỏ trống !';
            check = false;
        }
        if (isEmptyValue(formValue.street)) {
            errors.street = 'Tên đường không được bỏ trống !';
            check = false;
        }
        if (!formValue.province) {
            errors.province = 'Vui lòng chọn Tỉnh !';
            check = false;
        }
        if (!formValue.district) {
            errors.district = 'Vui lòng chọn Huyện !';
            check = false;
        }
        setFormError(errors);
        return check;
    };

    const handleRegister = async () => {
        const check = validateForm();
        if (check) {
            const data: RegisterType = {
                email: formValue.email,
                address: formValue.street + ' ' + formValue.district + ' ' + formValue.province,
                phone: formValue.phone,
                password: formValue.password,
                role: 'BUYER',
                first_name: formValue.first_name,
                last_name: formValue.last_name,
            };
            try {
                const res: string = await dispatch(createBuyer(data)).unwrap();
                console.log('res', res);
                if (res === 'Successfully Register') {
                    await toast.success('Vui lòng kiểm tra email của bạn để xác minh tài khoản');
                    setTimeout(() => {
                        navigate('/verify');
                    }, 3000);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Form invalid');
        }
    };
    return (
        <SignUpScreenWrapper>
            <FormGridWrapper>
                <Container>
                    <div className="form-grid-content">
                        <div className="brand-img-wrap flex items-center justify-center">
                            <img className="site-brand-img" src={register} alt="" />
                        </div>
                        <div className="form-grid-right">
                            <FormTitle>
                                <div className="w-full flex flex-col max-w-[550px]">
                                    <div className="w-full flex flex-col ">
                                        <h3 className="text-4xl font-semibold mb-1">Đăng kí</h3>
                                    </div>
                                </div>
                            </FormTitle>
                            <div>
                                <div className="w-full flex flex-col max-w-[550px]">
                                    {message != 'Successfully Register' ? (
                                        <div className="text-red-500 text-lg">{message}</div>
                                    ) : (
                                        <div className="text-green-500 text-lg">
                                            Vui lòng kiểm tra email của bạn để xác minh tài khoản
                                        </div>
                                    )}
                                    <div className="w-full flex flex-col">
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={(e) => {
                                                setFormValue({ ...formValue, email: e.target.value });
                                            }}
                                            placeholder="Email"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.email && (
                                            <div className="text-red-500 text-sm">{formError.email}</div>
                                        )}
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={(e) => {
                                                setFormValue({ ...formValue, password: e.target.value });
                                            }}
                                            placeholder="Mật khẩu"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.password && (
                                            <div className="text-red-500 text-sm">{formError.password}</div>
                                        )}
                                        <input
                                            type="tel"
                                            name="phone"
                                            onChange={(e) => {
                                                setFormValue({ ...formValue, phone: e.target.value });
                                            }}
                                            placeholder="Số điện thoại"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.phone && (
                                            <div className="text-red-500 text-sm">{formError.phone}</div>
                                        )}
                                        <input
                                            type="text"
                                            name="first_name"
                                            onChange={(e) => {
                                                setFormValue({ ...formValue, first_name: e.target.value });
                                            }}
                                            placeholder="Họ và tên đệm"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.first_name && (
                                            <div className="text-red-500 text-sm">{formError.first_name}</div>
                                        )}
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            onChange={(e) => {
                                                setFormValue({ ...formValue, last_name: e.target.value });
                                            }}
                                            placeholder="Tên"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.last_name && (
                                            <div className="text-red-500 text-sm">{formError.last_name}</div>
                                        )}

                                        <label
                                            htmlFor="Tinh"
                                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Tỉnh
                                        </label>
                                        <select
                                            id="Tinh"
                                            value={JSON.stringify(idProvice)}
                                            onChange={(e) => {
                                                setIdProvince(JSON.parse(e.target.value));
                                                setFormValue({
                                                    ...formValue,
                                                    province: JSON.parse(e.target.value).name,
                                                });
                                            }}
                                            className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="">Chọn Tỉnh ...</option>
                                            {listProvince.map((province, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={JSON.stringify({ id: province.id, name: province.name })}
                                                    >
                                                        {province.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {formError.province && (
                                            <div className="text-red-500 text-sm">{formError.province}</div>
                                        )}
                                        <label
                                            htmlFor="huyen"
                                            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Huyện
                                        </label>
                                        <select
                                            id="huyen"
                                            value={district}
                                            onChange={(e) => {
                                                setDistrict(e.target.value);
                                                setFormValue({ ...formValue, district: e.target.value });
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
                                        {formError.district && (
                                            <div className="text-red-500 text-sm">{formError.district}</div>
                                        )}
                                        <input
                                            type="text"
                                            name="street"
                                            id="street"
                                            onChange={(e) => {
                                                setFormValue({
                                                    ...formValue,
                                                    street: e.target.value,
                                                });
                                            }}
                                            placeholder="Tên Đường"
                                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                            required
                                        />
                                        {formError.street && (
                                            <div className="text-red-500 text-sm">{formError.street}</div>
                                        )}
                                        <div className="w-full flex flex-col my-4">
                                            <button
                                                // type="submit"
                                                onClick={() => handleRegister()}
                                                className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                                            >
                                                {isLoadingRegister == true ? 'Loading!!!' : 'Đăng kí'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="flex flex-wrap account-rel-text">
                                Bạn đã có tài khoản ?
                                <Link to="/login" className="font-medium">
                                    Đăng nhập ngay tại đây !!
                                </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </FormGridWrapper>
        </SignUpScreenWrapper>
    );
};
export default Register;
