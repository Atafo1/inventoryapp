import "./Signup.css";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import boxes from "../assets/boxes-white.svg";
import arrowright from "../assets/arrow-right-white (1).svg";
import mail from "../assets/mail (1).svg";
import lock from "../assets/lock (2).svg"
import profileicon from "../assets/user-round-pen.svg"
export function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignup() {
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast(error.message);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user?.id,
      full_name: fullName,
    });

    if (profileError) {
      console.log(profileError);
      toast(profileError.message);
      return;
    }

    toast("Account created successfully!");
    navigate("/dashboard");
  }
  return (
    <>
      <div className="container">
        <div className="signfirst-con">
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
              Start managing your
              <br />
              inventory today.
            </h1>
            <p className="Stext">
              Join Stockroom and keep track of products,
              <br /> stock levels and value at a glance.
            </p>
          </div>
          <div className="bottom-section">
            <p>© 2026 Stockroom</p>
          </div>
        </div>
        <div className="signsecond-con">
          <div className="boxHeader mobile-header">
            <h1>
              <img className="mainboxesone" src={boxes} alt="" />
              Stockroom
            </h1>
          </div>
          <form onSubmit={handleSignup}>
            <div className="thehead">
              <h4 className="welcome">Create an account</h4>
              <p>Sign up to get started with your dashboard</p>
            </div>
            <div className="pword-section">
              <p>FullName</p>
            </div>
            <div className="form-style" >
              <img src={profileicon} />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  padding: "5px",
                  border: "1px solid white",
                 
                }}
              />
            </div>

          <div className="pword-section">
              <p>Email</p>
            </div>
           
            <div className="form-style">
              <img src={mail} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "5px",
                  border: "1px solid white",
                 
                }}
              />
            </div>
            <div className="pword-section">
              <p>Password</p>
            </div>
            <div className="form-style">
              <img src={lock} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "5px", border: "1px solid white" }}
              />
            </div>
            <div className="pword-section">
              <p>Confirm Password</p>
            </div>
            <div className="form-style">
              <img src={lock} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ padding: "5px", border: "1px solid white" }}
              />
            </div>
            <br></br>

            <button className="signin-btn" type="button" onClick={handleSignup}>
              <div className="btn-con">
                Create account
                <img className="arrowright" src={arrowright} />
              </div>
            </button>

            <div className="account-section">
              <p> Already have an account? </p>
              <NavLink to="/" className="link">
                <p className="acc">Sign in</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
