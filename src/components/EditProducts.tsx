

import arrowleft from "../assets/arrow-left.svg";
import save from "../assets/save (2).svg";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { NavLink } from "react-router";
import "./EditProducts.css";
import { NavSection } from "./NavSection";
import { MobileHeader } from "./mobileHeader";
export function EditProducts() {



  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");

  async function updateButton() {
    const { error } = await supabase
      .from("products")
      .update({
        product_name: productName,
        sku,
        category,
        quantity,
        price,
        notes,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product updated successfully!");

    navigate("/product");
  }

 useEffect(() => {
  async function getProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setProductName(data.product_name);
    setSku(data.sku);
    setCategory(data.category);
    setQuantity(data.quantity);
    setPrice(data.price);
    setNotes(data.notes ?? "");
  }

  if (id) {
    getProduct();
  }
}, [id]);
  return (
    <>
      <div className="EditProducts-container">
     <NavSection/>
        <MobileHeader/>
        <div className="overview-section">
          <div className="AddProducts-Header">
            <NavLink
              to="/product"
              style={{ textDecoration: "none", color: "black" }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  opacity: "0.7",
                  fontSize: "12px",
                }}
              >
                <img
                  style={{ paddingRight: "10px", height: "15px" }}
                  src={arrowleft}
                ></img>
                Back to products
              </p>
            </NavLink>
            <h1 style={{ marginBottom: "0px" }}>Edit product</h1>
            <p style={{ marginTop: "0px", opacity: "0.7" }}>
              Update the Details
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "17px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <form>
              <label>Products name</label>
              <br></br>
              <input
                className="input-one"
                placeholder="e.g Wirless"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              ></input>
              <div className="addproducts-formpartone">
                <div>
                  <label>SKU</label>
                  <br></br>
                  <input
                    className="input-two"
                    placeholder="WM-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Category</label>
                  <br></br>
                  <input
                    className="input-two"
                    placeholder="Accesories"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="addproducts-formparttwo">
                <div>
                  <label>Quantity</label>
                  <br></br>
                  <input
                    className="input-three"
                    placeholder="0"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  ></input>
                </div>
                <div>
                  <label>Unit Price</label>
                  <br></br>
                  <input
                    className="input-three"
                    placeholder="0.01"
                    type="number"
                    step={0.01}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  ></input>
                </div>
              </div>
              <label>Notes(Optional)</label>
              <br></br>
              <textarea
                className="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <hr className="horizontal"></hr>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  paddingTop: "10px",
                }}
              ></div>
            </form>
              <div style={{ display: "flex", gap: "10px", marginTop: "1px" }}>
            <button
              type="button"
              onClick={updateButton}
              className="AddProduct-btn"
            >
              <img
                style={{ height: "15px", paddingRight: "5px" }}
                src={save}
              ></img>
              Edit Product
            </button>
            <button className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
