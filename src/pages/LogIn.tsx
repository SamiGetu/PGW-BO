import { useState } from "react";
import kispay from "../assets/logo.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "../lib/validator";
import { loginAPI } from "../services/Auth/login";
import useAuth from "../Hooks/useAuth";
import { AppModal, triggerModal } from "../components/UseModal";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  const modal = async (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    return await triggerModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = await loginAPI(data.email, data.password);
      console.log("response", response);
      if (response.status === 200) {
        const jsonData = await response.json();
        console.log("jsonData", jsonData.body.token, jsonData.body.user);
        loginAuth(jsonData.body.user, jsonData.body.token);
        navigate("/");
      } else {
        const jsonData = await response.json();
        console.log("Error", jsonData.message);
        modal("Oops", jsonData.message);
      }
    } catch (error) {
      console.log(error);
      modal("Oops", "something went wrong please try again");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <section className="h-screen w-full flex justify-center items-center">
        <div className="custom-shape-divider-top-1714647113">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="absolute top-5 left-5">
          {" "}
          <div className="flex justify-center items-center border bg-white w-20 h-20 rounded-full mx-auto p-2">
            <img
              className="mx-auto w-auto object-cover"
              src={kispay}
              alt="Your Company"
            />
          </div>
        </div>
        <div className="bg-white border-none lg:border w-[35rem] p-5 md:p-10 rounded-lg z-10">
          <h2 className="text-start text-4xl font-medium">Sign in</h2>

          <div className="mt-10 sm:mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-start gap-2">
                <div className="w-full flex flex-col items-start gap-7">
                  <TextField
                    label="Email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  />

                  <Box sx={{ width: "100%" }}>
                    {" "}
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <MdVisibilityOff />
                              ) : (
                                <MdVisibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    />{" "}
                    <Button
                      sx={{
                        fontWeight: "bold",
                        color: "#F58634",
                      }}
                    >
                      Forget Password
                    </Button>
                  </Box>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    background: "#F58634",
                    fontWeight: "bold",
                    color: "white",
                    ":hover": { background: "#F58633" },
                  }}
                >
                  {isSubmitting ? "Signing in ..." : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <AppModal title={modalTitle} content={modalContent} onClose={() => {}} />
    </>
  );
};
