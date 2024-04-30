import { useNavigate } from "react-router-dom";
import x from "../assets/x.jpg";
export const LogIn = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="h-screen w-full flex justify-center items-center">
        <div className="custom-shape-divider-top-1714387918">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="container h-full p-10 z-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-800">
            <div className="w-[80%]">
              <div className="block rounded-lg bg-white border-2">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-left mb-10">
                        <h1 className="text-5xl font-medium">KisPay</h1>
                      </div>

                      <form>
                        <p className="mb-4">Please login to your account</p>
                        {/* <!--Username input--> */}
                        <div
                          className="relative mb-10"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-[1px] focus:outline-none border-gray-400 bg-transparent px-3 py-[0.7rem]  leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                            id="exampleFormControlInput1"
                            placeholder="Email"
                          />
                        </div>

                        {/* <!--Password input--> */}
                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init
                        >
                          <input
                            type="password"
                            className="peer  block min-h-[auto] w-full rounded border-[1px] focus:outline-none border-gray-400 bg-transparent px-3 py-[0.7rem] "
                            id="exampleFormControlInput11"
                            placeholder="Password"
                          />
                        </div>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-left">
                          <button
                            className="mb-3 focus:outline-none inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-norma text-white  bg-sky-950"
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            onClick={() => navigate("/")}
                          >
                            Log in
                          </button>

                          {/* <!--Forgot password link--> */}
                          <span className="text-blue-700">
                            {" "}
                            <a href="#!">Forgot password?</a>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="flex justify-center items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none bg-white">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <img src={x} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
