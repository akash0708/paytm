import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function HandleClick() {
    const data = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      firstName,
      lastName,
      password,
    });
    const token = data.data.token;
    const userId = data.data.userId;
    localStorage.setItem("Auth", token);
    localStorage.setItem("userId", userId);
    navigate("/dashboard");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="12345"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <Button size="lg" className="w-full" onClick={HandleClick}>
            Sign up
          </Button>
          <p className="w-full mt-4 font-medium text-center">
            Already Have an account?{" "}
            <Link className="underline" to="/signin">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
