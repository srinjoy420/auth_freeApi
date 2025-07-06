import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";

const About = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // First try from localStorage
        const localData = localStorage.getItem("user-info");
        if (localData) {
          const parsed = JSON.parse(localData);
          setUserInfo(parsed);
          setLoading(false);
        } else {
          // Try to fetch from backend
          const res = await authService.currentuser();
          const user = res.data;
          const data = {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
          };
          localStorage.setItem("user-info", JSON.stringify(data));
          setUserInfo(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Could not fetch user data.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    localStorage.removeItem("auth-token"); // If needed
    navigate("/");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen flex justify-center bg-muted p-4">
      {userInfo && (
        <Card className="max-w-md w-full mt-10 p-4">
          <CardHeader className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={userInfo?.avatar?.url || ""} />
              <AvatarFallback>{userInfo?.username?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{userInfo.username}</CardTitle>
              <CardDescription>{userInfo.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Welcome to your profile</p>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default About;
