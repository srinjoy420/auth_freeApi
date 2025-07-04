import React, { useEffect, useState } from "react";
import authService from "../api/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await authService.currentuser();
        console.log(res);
        setProfile(res.data);
      } catch (error) {
        console.error("fetching error:", error);
        const message =
          error?.response?.data?.message ||
          "Login failed due to an unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); 
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex justify-center bg-muted">
      {profile && (
        <Card className="max-w-md w-full mt-10 p-4">
          <CardHeader className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {profile?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile.username}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-sm">Role: {profile.role}</p>
            <p className="text-sm text-muted-foreground">
              Verified: {profile.isEmailVerified ? "Yes" : "No"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default About;
