import React, { useRef, useEffect, FormEvent } from 'react';
import souvi from '@images/souvi.png';
import { verifyUser } from '../../../redux/slices/verifySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const VerifyAccount: React.FC = () => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.verify.message);
    const isLoadingVerify = useAppSelector((state) => state.verify.isLoading);
    const isErrorVerify = useAppSelector((state) => state.verify.isError);
    const navigate = useNavigate();
    useEffect(() => {
        const inputs = inputsRef.current;

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLInputElement;
            const index = inputs.indexOf(target);

            // Allow both numbers and letters (alphanumeric)
            if (
                !/^[a-zA-Z0-9]{1}$/.test(e.key) &&
                e.key !== 'Backspace' &&
                e.key !== 'Delete' &&
                e.key !== 'Tab' &&
                !e.metaKey
            ) {
                e.preventDefault();
            }

            if (e.key === 'Backspace') {
                if (target.value) {
                    target.value = '';
                } else if (index > 0 && inputs[index - 1]) {
                    inputs[index - 1]!.value = '';
                    inputs[index - 1]!.focus();
                }
                e.preventDefault();
            }

            if (e.key === 'Delete') {
                if (index < inputs.length - 1 && inputs[index + 1]) {
                    inputs[index + 1]!.focus();
                }
            }
        };

        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.toUpperCase(); // Automatically convert to uppercase
            const index = inputs.indexOf(target);
            if (target.value && index < inputs.length - 1 && inputs[index + 1]) {
                inputs[index + 1]!.focus();
            }
        };

        const handleFocus = (e: FocusEvent) => {
            (e.target as HTMLInputElement).select();
        };

        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData?.getData('text').toUpperCase(); // Convert pasted text to uppercase
            if (!new RegExp(`^[A-Z0-9]{${inputs.length}}$`).test(text || '')) {
                return;
            }
            const digits = text?.split('');
            inputs.forEach((input, index) => {
                if (input && digits) input.value = digits[index] || '';
            });
        };

        inputs.forEach((input) => {
            if (input) {
                input.addEventListener('input', handleInput);
                input.addEventListener('keydown', handleKeyDown);
                input.addEventListener('focus', handleFocus);
                input.addEventListener('paste', handlePaste);
            }
        });

        return () => {
            inputs.forEach((input) => {
                if (input) {
                    input.removeEventListener('input', handleInput);
                    input.removeEventListener('keydown', handleKeyDown);
                    input.removeEventListener('focus', handleFocus);
                    input.removeEventListener('paste', handlePaste);
                }
            });
        };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const otpCode = inputsRef.current.map((input) => input?.value || '').join('');
        try {
            const res = await dispatch(verifyUser(otpCode)).unwrap();
            console.log('res', res);
            if (res === 'Account verification successfully') {
                // await toast.success('Xác minh tài khoản thành công !');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={souvi} className="w-full h-full" alt="Pet Dog" />
            </div>
            <div className="w-1/2 h-full flex justify-center align-middle">
                <div className="max-w-md mx-auto my-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl h-80">
                    <header className="mb-8">
                        <h1 className="text-2xl font-bold mb-1">Xác minh tài khoản</h1>
                        <p className="text-[15px] text-slate-500">
                            Nhập mã xác minh gồm 6 kí tự đã được gửi tới email của bạn.
                        </p>
                        {isErrorVerify && <div className="text-red-500 text-lg">{message}</div>}
                        {isErrorVerify == false && isLoadingVerify == false && (
                            <div className="text-green-500 text-lg">{message}</div>
                        )}
                    </header>
                    <form onSubmit={handleSubmit} id="otp-form">
                        <div className="flex items-center justify-center gap-3">
                            {[...Array(6)].map((_, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (inputsRef.current[idx] = el)}
                                    type="text"
                                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                        <div className="max-w-[260px] mx-auto mt-4">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                            >
                                {isLoadingVerify == true ? 'Loading !!!' : 'Xác minh'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
