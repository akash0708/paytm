import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("Auth");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter='abc'")
      .then((res) => {
        setUsers(res.data.user);
        console.log(res.data.user);
      });

    axios
      .get(`http://localhost:3000/api/v1/account/balance?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBalance(Math.round(res.data.balance * 100) / 100);
      });
  }, []);

  return (
    <>
      <nav className="w-full h-fit flex justify-between items-center px-12 py-3 shadow font-medium">
        <div>PayUP</div>
        <div className="flex justify-center items-center gap-4">
          <span>Hello</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <main className="w-full min-h-60 flex flex-col justify-center gap-4 p-12">
        <div className="balance text-lg font-bold">
          Current balance: Rs {balance}
        </div>
        <div className="users balance text-lg font-semibold flex flex-col gap-2">
          Users
          <Command className="shadow-sm">
            <Input
              placeholder="Search users..."
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
          </Command>
        </div>
        <div className="users-list overflow-y-scroll h-[20rem] flex flex-col gap-4 py-4 px-1 bg-white">
          {users.map((user) => {
            return (
              <div
                key={user.username}
                className="user hover:bg-slate-100 p-1 rounded-sm flex justify-between"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.username}</span>
                </div>
                {/* // dialog */}
                <Button asChild>
                  <Link to={`/send?id=${user._id}&name=${user.firstName}`}>
                    Send Money
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
