const LoginPage = () => {
  return (
    <section className="flex justify-center relative">
      <img
        src="https://pagedone.io/asset/uploads/1702362010.png"
        alt="gradient background image"
        className="w-full h-full object-cover fixed"
      />
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <img
          src="https://pagedone.io/asset/uploads/1702362108.png"
          alt="pagedone logo"
          className="mx-auto lg:mb-11 mb-8 object-cover"
        />
        <div className="rounded-2xl bg-white shadow-xl">
          <form action="" className="lg:p-11 p-7 mx-auto">
            <div className="mb-11">
              <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-center text-base font-medium leading-6">
                Let’s get started with your 30 days free trail
              </p>
            </div>
            <input
              type="text"
              className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
              placeholder="Username"
            />
            <input
              type="password"
              className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-8"
              placeholder="Password"
            />
            <button className=" w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-6">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
