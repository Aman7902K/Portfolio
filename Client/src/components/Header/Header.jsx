import React from "react";
import { NavLink } from "react-router";

function Header() {
  const baseLink =
    "px-2 sm:px-4 py-2 rounded-full transition-colors duration-200 select-none text-sm sm:text-base whitespace-nowrap";
  const inactive =
    "text-slate-300 hover:text-slate-100 hover:bg-white/5";
  const active =
    "text-white bg-white/10 ring-1 ring-white/20";

  return (
    <>
      <div className="flex justify-center w-full h-[10vh] text-slate-400">
        <div className="mainComponent w-[90%] sm:w-[80%] h-full flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20">
          <nav aria-label="Primary" className="w-full">
            <ul className="list-none flex justify-around items-center px-2 sm:px-4 gap-1 sm:gap-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  About Me
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactMe"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  Contact Me
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;