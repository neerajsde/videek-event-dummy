import React, { useContext, useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import MdLoader from "../components/spinner/MdLoader";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [isVisiablePassword, setIsVisiablePassword] = useState(false);
  const [activeOtpInput, setActiveOtpInput] = useState(false);
  const [serverOTP, setServerOtp] = useState('');
  const [token, setToken] = useState('');
  const { AuthUser, setIsActiveLoginPage } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [isVisiablePass, setIsVisiablePass] = useState(false);
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const [user_id, setUser_id] = useState("");
  const [formData, setFormData] = useState({
    input: "",
    email: "",
    password: "",
    mobile: "",
    otp: ""
  });

  function inputHandler(event) {
    setEmailError("");
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const [otpData, setOtpData] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  function otpInputHandler(event) {
    setOtpData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    setFormData((prevstate) => ({
      ...prevstate,
      otp: otpData.one + otpData.two + otpData.three + otpData.four + otpData.five + otpData.six
    }))
  },[otpData]);

  // Function to handle Google Sign-Up
  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Successful:", response);

      // Fetch user data from Google's UserInfo API
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        console.log("Google User Data:", data);

        // Send user data to your backend for saving into the database
        // await axios.post("/api/signup", {
        //   name: data.name,
        //   email: data.email,
        //   profilePicture: data.picture,
        // });

        alert("Signup Successful!");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (emailRegex.test(formData.input)) {
          setFormData((prevState) => ({
            ...prevState,
            email: formData.input, // Update the email field
          }));
          setIsActivePassword(true);

          // if data is persent
          if (formData.email !== "" && formData.password !== "") {
            emailSubmitHadler();
          } else if (formData.password === "") {
            toast.success("Please enter your pasword");
          } else {
            toast.success("Sucess");
          }
        } else if (mobileRegex.test(formData.input)) {
          setFormData((prevState) => ({
            ...prevState,
            mobile: formData.input,
          }));
          if(formData.mobile !== ''){
            if(activeOtpInput){
              if((formData.otp !== '') || (formData.otp.length === 6)){
                verifyOtp();
              }
              else{
                toast.error('Please enter otp')
              }
            }
            else{
              await mobileSubmitHandler();
            }
          }
          
        } else {
          setEmailError({error: true, message:"Please enter a valid email or mobile number."});
          return;
        }
      } else {
        setEmailError({error: true, message:"Input cannot be empty. Please enter an email or mobile number."});
        return;
      }
    } catch (err) {
      setEmailError({error: true, message:"Something went wrong. Please try again."});
    }
  };

  const emailSubmitHadler = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/user/login-email`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setUser_id(data.user_id);
        localStorage.setItem("DJevents", data.token);
        await AuthUser();
        setIsActiveLoginPage(false);
        toast.success("Logged in successfully");
        setFormData({
          input: "",
          email: "",
          password: "",
          mobile: "",
          otp: ""
        });
      } else {
        if (data.tag === "email") {
          setEmailError({ error: true, message: data.message });
        } else if (data.tag === "password") {
          setPasswordError({ error: true, message: data.message });
        } else {
          setEmailError({error: true, message: "An unexpected error occurred. Please try again."});
        }
      }
    } catch (err) {
      console.error("Error:", err.message);
      setEmailError({error: true, message: "Failed to sign in. Please check your network connection or try again later."});
    } finally {
      setLoading(false);
    }
  };

  const mobileSubmitHandler = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/user/login-mobile`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: '+91' + formData.mobile
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setActiveOtpInput(true);
        setUser_id(data.user_id);
        setServerOtp(data.otp);
        setToken(data.token);
        toast.success("OTP sent successfully");
      } else {
        setEmailError({error: true, message: data.message || "An unexpected error occurred. Please try again."});
      }
    } catch (err) {
      setEmailError({error: true, message: "Failed to sign in. Please check your network connection or try again later."});
    } finally {
      setLoading(false);
    }
  }

  const verifyOtp = async () => {
    try{
      if((parseInt(formData.otp) === serverOTP) && (token !== '')){
        localStorage.setItem("DJevents", token);
        await AuthUser();
        setIsActiveLoginPage(false);
        toast.success('Log in sucessfull');
        setFormData({
          input: "",
          email: "",
          password: "",
          mobile: "",
          otp: ""
        });
      }
      else{
        toast.error('wrong otp');
      }
    } catch(err){
      toast.error('Somrthing went wrong')
    }
  }

  return (
    <div className="w-[500px] min-h-[350px] relative flex items-center justify-center bg-white rounded-lg mt-6 max-sm:mt-0">
      <div className="w-full flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In/Sign Up
        </h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              name="input"
              value={formData.input}
              onChange={inputHandler}
              placeholder="Enter email or mobile*"
              disabled={isActivePassword || activeOtpInput}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 ${
                (isActivePassword || activeOtpInput) && " cursor-not-allowed bg-gray-200"
              }`}
            />
            {emailError.error !== "" && (
              <div className="text-xs text-red-500 pl-4">{emailError.message}</div>
            )}
          </div>
          {isActivePassword && (
            <div className="w-full flex flex-col gap-1 relative">
              <input
                type={isVisiablePassword ? 'text': "password"}
                name="password"
                value={formData.password}
                onChange={inputHandler}
                placeholder="Enter password*"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
              />
              <div className="absolute top-2 right-2 text-2xl text-gray-400 cursor-pointer" onClick={() => setIsVisiablePassword(!isVisiablePassword)}>
                {
                  isVisiablePassword ? (<IoMdEyeOff/>) : (<IoMdEye/>)
                }
              </div>
              {passwordError.error !== "" && (
                <div className="text-xs text-red-500 pl-4">{passwordError.message}</div>
              )}
            </div>
          )}
          {activeOtpInput && (
            <div className="w-full flex flex-col gap-1">
              <label>Enter OTP*</label>
              <div className="w-full flex justify-between items-center gap-4">
                <input
                  type="text"
                  name="one"
                  value={otpData.one}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
                <input
                  type="text"
                  name="two"
                  value={otpData.two}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
                <input
                  type="text"
                  name="three"
                  value={otpData.three}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
                <input
                  type="text"
                  name="four"
                  value={otpData.four}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
                <input
                  type="text"
                  name="five"
                  value={otpData.five}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
                <input
                  type="text"
                  name="six"
                  value={otpData.six}
                  onChange={otpInputHandler}
                  placeholder="-"
                  maxLength={1}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 text-center"
                />
              </div>
            </div>
          )}
          {(isActivePassword || activeOtpInput) && (
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-[200px] py-2 px-3 border bg-pink-500 rounded text-black font-semibold text-base transition duration-200 ease-in hover:bg-pink-600"
              >
                Submit
              </button>
            </div>
          )}
          <div className="relative my-4 flex items-center justify-center">
            <span className="absolute bg-white px-2 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex justify-between items-center mb-6 max-sm:flex-col">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 mr-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
            >
              <FaFacebookF className="mr-2 text-blue-600" />
              Facebook
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp} // Trigger Google Signup
              className="flex items-center justify-center w-full px-4 py-2 ml-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
            >
              <FcGoogle className="mr-2" />
              Google
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center items-center gap-4 max-sm:flex-col">
          <p className="text-sm text-gray-600">Are you a vendor?</p>
          <Link
            to={`vendor.${window.origin
              .replace("https://", "")
              .replace("http://", "")}/`}
            className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Business Sign In
          </Link>
        </div>
      </div>

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-[#00000097] flex justify-center items-center">
          <MdLoader />
        </div>
      )}
    </div>
  );
};

export default Login;
