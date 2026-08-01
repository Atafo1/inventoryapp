import "./HomePage.css";
import { supabase } from "./lib/supabase";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import boxes from "./assets/boxes-white.svg";
import arrowright from "./assets/arrow-right-white (1).svg";
import lock from "./assets/lock (2).svg";
import mail from "./assets/mail (1).svg";
export function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast(error.message);
      return;
    }

    if (data.session) {
      navigate("/dashboard");
      return;
    }

    toast("Login successful!");
  }
  return (
    <>
      <div className="container">
        <div className="first-con">
          <div className="boxHeader">
            <h1 style={{ fontSize: "14px" }}>
              <img
                style={{
                  marginRight: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="mainboxes"
                src={boxes}
              />{" "}
              Stockroom
            </h1>
          </div>
          <div className="mid-section">
            <h1 className="Ftext">
              A calmer way to manage
              <br />
              your inventory.
            </h1>
            <p className="Stext">
              Track products, stock levels and value at a glance -- <br />{" "}
              without the spreadsheet chaos.
            </p>
          </div>
          <div className="bottom-section">
            <p>© 2026 Stockroom</p>
          </div>
        </div>
        <div className="second-con">
          <div className="boxHeader mobile-header">
            <h1>
              <img className="mainboxesone" src={boxes} alt="" />
              Stockroom
            </h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="thehead">
              <h4 className="welcome">Welcome back</h4>
              <p>Sign in to continue to your Dashboard</p>
            </div>
            <div className="pword-section">
              <p>Email</p>
              </div>
       
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "3px",
                borderRadius: "8px",
              }}
            >
              <img src={mail} alt="Email icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                 marginLeft: "10px",
                  border: "1px solid white",
                  backgroundColor: "white",
                }}
              />
            </div>
            <div className="pword-section">
              <p>Password</p>
              <NavLink to="/" className="link">
                <p className="fword">Forgot password?</p>
              </NavLink>
            </div>
            <div
             style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "3px",
                borderRadius: "8px",
              }}
            >
            <img src={lock}/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{  marginLeft: "10px", border: "1px solid white" }}
            /></div>
            <br></br>
            <button className="signin-btn" type="submit">
              <div className="btn-con">
                Sign in
                <img className="arrowright" src={arrowright} />
              </div>
            </button>
            <div className="account-section">
              <p> Don't have an account? </p>
              <NavLink to="/signup" className="link">
                <p className="acc">Get Started</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
