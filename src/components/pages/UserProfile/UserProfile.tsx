const UserProfile = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 py-4 md:p-8 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold text-[#161931] mb-6"> Hồ sơ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-6">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-pink-400 dark:ring-indigo-500"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                className="py-3.5 px-7 text-base font-medium text-white bg-pink-300 rounded-lg border border-pink-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
              >
                Thay đổi ảnh
              </button>
              <button
                type="button"
                className="py-3.5 px-7 text-base font-medium text-indigo-900 bg-white rounded-lg border border-pink-300 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
              >
                Lịch sử đặt hàng
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                  Tên
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-indigo-50 border border-pink-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                  Điện thoại
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-indigo-50 border border-pink-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-indigo-50 border border-pink-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                Ngày sinh
              </label>
              <input
                type="text"
                id="profession"
                className="bg-indigo-50 border border-pink-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                Địa chỉ
              </label>
              <input
                type="text"
                id="profession"
                className="bg-indigo-50 border border-pink-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-pink-300 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
