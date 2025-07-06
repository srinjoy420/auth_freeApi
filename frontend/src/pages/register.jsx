import React, { useState } from "react";
import authService from "../api/authService";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Attempt to sign up the user
      console.log("Trying to sign up...");
      const res = await authService.register(formData);
      console.log("Signup response:", res);

      if (res.success) {
        // If the signup was successful, navigate to the login page
        navigate("/login");
      } else {
        // If the signup failed, show an error message
        setError(res.message || "Signup failed");
      }
    } catch (error) {
      // If an error occurred while attempting to sign up, show an error message
      console.log("Signup error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed due to an unknown error";
      setError(message);
    } finally {
      // Set the loading state to false, regardless of whether the signup succeeded or failed
      setLoading(false);
    }
  };
/*******  9251b1e0-25df-478d-8c8c-ea8422e8bd9b  *******/

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register your details</CardTitle>
        <CardDescription>Enter your details to sign up</CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Srinjoy Ghosh"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
