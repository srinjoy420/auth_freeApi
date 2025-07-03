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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
      console.log("Trying to log in...");
      const res = await authService.login(formData);
      console.log("Login success response:", res);

      if (res.success) {
        setSuccess("Successfully logged in!");
        navigate("/me");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed due to an unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password</CardDescription>
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

              {/* Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </Button>

              {/* Error */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Success */}
              {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
