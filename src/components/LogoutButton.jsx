import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, call logout API, etc.
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      aria-label="Log out"
    >
      <LogOutIcon size={16} />
      <span>Logout</span>
    </button>
  );
}
