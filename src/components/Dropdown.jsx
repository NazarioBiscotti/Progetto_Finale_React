import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Dropdown() {
  const { user, signOut, pUrl } = useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);


  const altImage = "/noAvatar.png";

  function handleLogout() {
    signOut();
    setOpen(false);
    navigate("/login");
  }


  useEffect(()=>{

    console.log(open);
    
  }, [])



  return (
    <div className="relative">
      {/* BUTTON (con avatar) */}
      <button onClick={() => setOpen((prev) => !prev)} className="bg-gray-50 h-14 w-14 rounded-full border-4 border-amber-200 overflow-hidden flex items-center justify-center">
        <img className="w-full h-full object-cover"  src={user ? `${pUrl}?t=${Date.now()}` : altImage} alt="avatar"/>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg z-50 overflow-hidden">
          <div className="py-1 text-sm text-gray-300">

            <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-white/5 hover:text-white">
              Login
            </Link>

            <Link to="/register" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-white/5 hover:text-white">
              Register
            </Link>

            <hr className="border-white/10 my-1" />

            {user && (
              <div className="flex">
                <Link to="/profile" onClick={() => setOpen(false)} className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white" >
                  Profile
                </Link>

                <button onClick={handleLogout} className="w-1/2 px-2 py-2 hover:bg-white/5 hover:text-white" >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}