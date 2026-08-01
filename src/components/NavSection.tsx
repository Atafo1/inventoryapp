import producticon from "../assets/package-white.svg";
import logout from "../assets/log-out-white.svg";
import profilepic from "../assets/main profile pic.png";
import boxes from "../assets/boxes-white.svg";
import dashboard from "../assets/layout-dashboard-white.svg";
import { toast } from "react-toastify";
import {  useState,useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";
import './NavSection.css'
export function NavSection() {
 const navigate = useNavigate();

     async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast(error.message);
    return;
  }

  navigate("/");
}
 type Profile = {
    id: string;
    full_name: string;
  };
 const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");

  //   useEffect(() => {
  //   getProfile();
  // }, []);


useEffect(() => {
  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email ?? "");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(profile);
  }

  loadData();
}, []);
    return(
 <div className="nav-section">
          <div className="upper-section">
            <div className="upperone">
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
            <hr></hr>
            <div className="uppertwo">
              <NavLink
                style={{
                  textDecoration: "none",
                  width: "100%",
                  marginLeft: "10px",
                }}
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                <button>
                  <img className="icons" src={dashboard}></img>Dashboard
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
                  isActive ? "active-link" : "link"
                }
              >
                <button>
                  <img className="icons" src={producticon}></img>Products
                </button>
              </NavLink>
            </div>
          </div>
          <div className="lower-section">
            <hr></hr>
            <div className="lowerone">
              <img className="profile" src={profilepic}></img>
              <h3>
                {profile?.full_name}
                <br></br>
                <span>{email}</span>
              </h3>
            </div>
            <div>
              <button onClick={handleLogout} style={{ border: "none", background: "none", cursor: "pointer" }} className="logout">
                <span>
                  <img src={logout} />
                  <p>Sign out</p>
                </span>
              </button>
            </div>
          </div>
        </div>
    );
}