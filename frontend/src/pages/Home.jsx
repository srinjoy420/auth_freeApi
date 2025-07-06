import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { GoogleOAuthProvider  } from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from "../api/googleApi.js";

const Home = () => {
  const navigate = useNavigate();

//   const handleGoogleLogin = () => {
//     // Redirect to your backend Google OAuth URL
//     window.location.href = `${import.meta.env.VITE_API_BASE_URL}/users/google`;
//   };
const responseGoogle=async (authResult)=>{
        try {
            if(authResult['code']){
              const result=await googleAuth(authResult['code'])
              const{email,username,avatar }=result.data.user;
              const token=result.data.token
              const obj={email,username,avatar,token}
              localStorage.setItem("user-info",JSON.stringify(obj))
              navigate("/me")
              console.log("user logging in","email",email,"username",username,avatar?.url);
              console.log("token",token);
              
              
                
            }
            console.log(authResult);
            
        } catch (error) {
            console.error("error while requesting",error);
            
            
        }
    }
    const googleLogin=useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-code'
    })

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Our App</h1>
        <p className="text-muted-foreground">Choose an option to get started:</p>
        
        <div className="space-y-4 flex flex-col items-center">
          <Button className="w-60" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button className="w-60" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button variant="outline" className="w-60" onClick={googleLogin}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
