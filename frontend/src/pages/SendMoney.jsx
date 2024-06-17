import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function SendMoney() {
  const [searchparams] = useSearchParams();
  const [amount, setAmount] = useState();

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl text-center mb-4">
            Send Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex items-center gap-4 space-y-1.5">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green-400 text-white">
                    {searchparams.get("name")[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="font-semibold text-xl">
                  {searchparams.get("name")}
                </div>
              </div>
              <div className="flex flex-col gap-2 space-y-1.5">
                <Label htmlFor="amount">Amount (in Rs)</Label>
                <Input
                  id="amount"
                  placeholder="123"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <Button
            onClick={() => {
              axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: searchparams.get("id"),
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("Auth"),
                  },
                }
              );
              navigate("/dashboard");
            }}
            size="lg"
            className="w-full bg-green-500 hover:bg-green-400"
          >
            Initiate Transfer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
