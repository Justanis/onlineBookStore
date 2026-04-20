import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, signIn } = useAuth();

  const handleSignIn = async () => {
    await signIn(email, password);
  };

  if (user) {
    redirect("/"); // Redirect to home page if already authenticated
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <button
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </CardContent>
        </Card>
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => (window.location.href = "/signup")}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}
