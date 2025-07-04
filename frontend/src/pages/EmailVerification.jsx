import React, { useEffect, useState } from "react";
import authService from "../api/authService";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

const EmailVerification = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await authService.emailVerification(token);
        console.log("Verification response:", res);
        setStatus("success");
        setMessage(res?.message || "Email verified successfully");
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus("error");
        setMessage(
          error?.response?.data?.message ||
            "Verification failed. Token may be invalid or expired."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-muted">
      <Card className="max-w-md w-full mt-10 p-4">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {status === "loading" && (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Verifying your email...
              </div>
            )}
            {status === "success" && (
              <p className="text-green-600">{message}</p>
            )}
            {status === "error" && (
              <p className="text-red-600">{message}</p>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          {status === "success" && (
            <>
              <p className="text-sm text-muted-foreground mt-4">
                You can now log in to your account.
              </p>
              <Button asChild className="mt-4">
                <Link to="/login">Go to Login</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
