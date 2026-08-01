import navbar from "../assets/ellipsis-vertical.svg";
import boxes from "../assets/boxes-white.svg";
import dashboardblack from "../assets/layout-dashboardblack.svg";
import producticontwo from "../assets/package (2).svg";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./mobileHeader.css";
import { useState } from "react";
import { useRef, useEffect } from "react";

export function MobileHeader() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast(error.message);
      return;
    }

    navigate("/");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="mobileHeader">
        <div className="mobileupperone">
          <img
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mainboxestwo"
            src={boxes}
          ></img>
          <h3 className="upperone-text">
            Stockroom<br></br>
            <span>Inventory</span>
          </h3>
        </div>
        <div className="mobile-texts">
          <div className="mobile-top" ref={menuRef}>
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              <img src={navbar} alt="Menu" />
            </button>

            {showMenu && (
              <div className="menu-dropdown">
                <button onClick={handleLogout} className="logout-mobile">
                  Sign out
                </button>
              </div>
            )}
          </div>
          <div className="uppertwo">
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "mobileactive-link" : "mobilelink"
              }
            >
              <button className=" dashboardicons">
                <img className="icons" src={dashboardblack}></img>Dashboard
              </button>
            </NavLink>

            <NavLink
              style={{
                textDecoration: "none",
                width: "100%",
                marginLeft: "10px",
              }}
              to="/product"
              className={({ isActive }) =>
                isActive ? "mobileactive-link" : "mobilelink"
              }
            >
              <button className=" producticons">
                <img className="icons" src={producticontwo}></img>Products
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
