import {User} from "lucide-react";

export default function LogInButton() {
  return (
    <button className="flex items-start justify-center gap-x-2">
      <User/>
      <span>Log In</span>
    </button>
  );
}