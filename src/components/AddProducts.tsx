
import arrowleft from "../assets/arrow-left.svg";
import save from "../assets/save (2).svg";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";
import {  useState, } from "react";
import { NavLink } from "react-router";
import "./AddProducts.css";
import { NavSection } from "./NavSection";
import { MobileHeader } from "./MobileHeader";
export function AddProducts() {


 

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  async function addProduct() {
 if (
  !productName ||
  !sku ||
  !category ||
  quantity <= 0 ||
  price <= 0
) {
  alert("Please fill in all required fields.");
  return;
}

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please log in.");
      return;
    }

    const { error } = await supabase.from("products").insert({
      user_id: user.id,
      product_name: productName,
      sku,
      category,
      quantity,
      price,
      notes,
    });

   

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product added successfully!");

    navigate("/product");
  }
  return (
    <>
      <div className="Productpage-container">
        <NavSection/>
       <MobileHeader/>
        <div className="AddProductsoverview-section">
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
            <h1 style={{ marginBottom: "0px" }}>Add a new product</h1>
            <p style={{ marginTop: "0px", opacity: "0.7" }}>
              Fill in the details below to add an item to the inventory
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input-one"
                placeholder="e.g Wirless"
              ></input>
              <div className="addproducts-formpartone">
                <div>
                  <label>SKU</label>
                  <br></br>
                  <input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="input-two"
                    placeholder="WM-001"
                  ></input>
                </div>
                <div>
                  <label>Category</label>
                  <br></br>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-two"
                    placeholder="Accesories"
                  ></input>
                </div>
              </div>
              <div className="addproducts-formparttwo">
                <div>
                  <label>Quantity</label>
                  <br></br>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="input-three"
                    placeholder="0"
                    type="number"
                  ></input>
                </div>
                <div>
                  <label>Unit Price</label>
                  <br></br>
                  <input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="input-three"
                    placeholder="0.01"
                    type="number"
                    step={0.01}
                  ></input>
                </div>
              </div>
              <label>Notes(Optional)</label>
              <br></br>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="notes"
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
              onClick={addProduct}
              className="AddProduct-btn"
            >
              <img
                style={{ height: "15px", paddingRight: "5px" }}
                src={save}
              ></img>
              Add Products
            </button>
            <NavLink to="/product" style={{ textDecoration: "none" }}>
            <button className="cancel-btn" >Cancel</button>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
