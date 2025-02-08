import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input,Button } from "../components";
import databaseService from "../services/database.services";
import { login } from "../slices/userSlice/authSlice";

function Login() {
  const { register, getValues, setValue, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  if (authStatus) navigate("/");
  const dispatch=useDispatch()

  const submit = async (data) => {
    try {
      const session= await databaseService.login(data)
      if(session){
        const user=await databaseService.getCurrentuser()
        console.log("Login User :",user);
        
        if(user){
          dispatch(login(user.data))
        }
        navigate('/')
      }

    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="First name : "
          placeholder="Enter your first name"
          {...register("firstName", { required: true })}
        />
        <Input
          type="tel"
          label="Mobile Number"
          placeholder="Enter your mobile number"
          {...register("mobile", { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter password (new)"
          {...register("password", { required: true })}
        />
           {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <Button type="Submit">Submit</Button>
      </form>
    </>
  );
}

export default Login;
