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
      console.log("Trying to sign up...");
      const res = await authService.register(formData);
      console.log("Signup response:", res);

      if (res.success) {
        navigate("/login");
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (error) {
      console.log("Signup error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Signup failed due to an unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
