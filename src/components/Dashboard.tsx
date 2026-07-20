import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";


import arrowup from "../assets/arrow-up-right.svg";
import packageblue from "../assets/package (1).svg";
import layers from "../assets/layers (1).svg";
import dollar from "../assets/dollar-sign (1).svg";
import danger from "../assets/triangle-alert.svg";

import { NavLink } from "react-router";
import { NavSection } from "./NavSection";
import { MobileHeader } from "./MobileHeader";
import "./Dashboard.css";
export function Dashboard() {
  

  type Product = {
    id: string;
    user_id: string;
    product_name: string;
    category: string;
    price: number;
    quantity: number;
    created_at: string;
  };
  const [products, setProducts] = useState<Product[]>([]);
 
  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );
  const lowStock = products.filter((product) => product.quantity < 10);
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  type Profile = {
    id: string;
    full_name: string;
  };
  const [profile, setProfile] = useState<Profile | null>(null);

  //   useEffect(() => {
  //   getProfile();
  // }, []);

 useEffect(() => {
  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profile);

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);

    setProducts(products ?? []);
  }

  loadData();
}, []);
  return (
    <>
      <div className="dashboard-container">
        <NavSection />
         <MobileHeader/>
        <div className="dashboardoverview-section">
          <div className="second-header">
            <div className="second-headertexts">
              <p>Welcome back,</p>
              <h3>{profile?.full_name}</h3>
            </div>
            <div className="productbtn">
              <NavLink
                to="/product"
                style={{ textDecoration: "none",cursor: "pointer" }}
              >
                <button
                  style={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:"pointer"
                  }}
                >
                  View products{" "}
                  <img src={arrowup} style={{ height: "20px" }}></img>
                </button>{" "}
              </NavLink>
            </div>
          </div>
          <div className="overview-details">
            <div className="overviewone">
              <p>
                <span className="first-span">TOTAL PRODUCTS</span>{" "}
                <span className="span">{products.length}</span>
              </p>
              <img
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#0067cd46",
                  padding: "3px",
                  borderRadius: "7px",
                }}
                src={packageblue}
              ></img>
            </div>
            <div className="overviewone">
              <p>
                <span className="first-span">ITEMS IN STOCK </span>
                <span className="span">{totalItems}</span>
              </p>
              <img
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#00ac6d3f",
                  padding: "3px",
                  borderRadius: "7px",
                }}
                src={layers}
              ></img>
            </div>
            <div className="overviewone">
              <p>
                <span className="first-span"> INVENTORY VALUE</span>
                <span className="span">₦{inventoryValue.toLocaleString()}</span>
              </p>
              <img
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#0067cd5e",
                  padding: "3px",
                  borderRadius: "7px",
                }}
                src={dollar}
              ></img>
            </div>
            <div className="overviewone">
              <p>
                <span className="first-span">LOW STOCK ALERT</span>{" "}
                <span className="span">{lowStock.length}</span>
              </p>
              <img
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "#f2a6183f",
                  padding: "3px",
                  borderRadius: "7px",
                }}
                src={danger}
              ></img>
            </div>
          </div>
          <div className="products-overview">
            <div className="recents">
              <div className="third-header">
                <p className="paragraph">Recents Products</p>
                <p>See all</p>
              </div>
              <div>
                <div>
                  <div className="recentsone">
                    {recentProducts.map((product) => (
                      <div className="recentproducts" key={product.id}>
                        <div className="recentstexts">
                          <h1>{product.product_name}</h1>
                          <p>{product.category}</p>
                        </div>

                        <div className="recentstexts">
                          <h1>₦{product.price.toLocaleString()}</h1>
                          <p>{product.quantity} in stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="stock">
              <p className="fourth-header">Low stock</p>
              <div>
                {lowStock.map((product) => (
                  <div className="stockone" key={product.id}>
                    <div className="stockone-first">
                      <p className="stockone-first-p">{product.product_name}</p>
                      <p className="mon">MON-27Q</p>
                    </div>
                    <p className="alert">{product.quantity} left</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
