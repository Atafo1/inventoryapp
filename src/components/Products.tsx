import pencil from "../assets/pencil (2).svg";
import trash from "../assets/trash-2 (1).svg";
import search from "../assets/search (3).svg";
import plus from "../assets/plus (1).svg";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import "./Products.css";
import { NavSection } from "./NavSection";
import { MobileHeader } from "./MobileHeader";
export function Products() {
  type Product = {
    id: string;
    user_id: string;
    product_name: string;
    sku: string;
    category: string;
    quantity: number;
    price: number;
    created_at: string;
  };
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  async function loadProducts() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setProducts(data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }
  toast.success("Product deleted successfully");

    // Refresh the list after deleting
    loadProducts();
  }
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.product_name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });
  return (
    <>
      <div className="Products-container">
        <NavSection />
        <MobileHeader />
        <div className="productoverview-section">
          <div className="Products-header">
            <div>
              <h1 style={{ padding: "0px", margin: "0px" }}>Products</h1>
              <p style={{ opacity: 0.7, padding: "0px", margin: "0px" }}>
                {products.length} items in your inventory
              </p>
            </div>
            <div 
             
            >
              <NavLink style={{ textDecoration: "none" }} to="/addproducts">
                <button className="addbtn"
                  style={{
                    width:"100%",
                    backgroundColor: "#0065CD",
                    border: "1px solid #0065CD",
                    color: "white",
                    padding: " 7px 23px",
                    marginRight: "10px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{ height: "15px", paddingRight: "10px" }}
                    src={plus}
                  />{" "}
                  Add Products
                </button>
              </NavLink>
            </div>
          </div>
          <div className="Products-Details">
            <div className="Search-bar">
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.16)",
                  padding: "6px",
                  width: "40%",
                  borderRadius: "5px",
                  boxShadow: " 0 0 5px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <img
                  style={{ opacity: 0.5, paddingRight: "3px", height: "16px" }}
                  src={search}
                />
                <input
                  style={{ width: "60%", border: "1px solid white" }}
                  type="text"
                  placeholder="Search by name ,SKU or category"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="table-scroll">
              <div className="Products-Headings">
                <p>Products</p>
                <p>SKU</p>
                <p>Category</p>
                <p>Qty</p>
                <p>Price</p>
                <p>Value</p>
                <p>Actions</p>
              </div>
              <div className="Product-data">
                {loading ? (
                  <Loader />
                ) : products.length === 0 ? (
                  <div className="empty-products">
                    <h3>No products yet</h3>
                    <p>Click "Add Products" to add your first product.</p>

                    
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="empty-products">
                    <h3>No products found</h3>
                    <p>
                      No products match "<strong>{searchTerm}</strong>".
                    </p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <div key={product.id}>
                      <div className="Dataone">
                        <p>{product.product_name}</p>

                        <p>{product.sku}</p>

                        <p>{product.category}</p>

                        <p>{product.quantity}</p>

                        <p>₦{product.price.toLocaleString()}</p>

                        <p>
                          ₦{(product.price * product.quantity).toLocaleString()}
                        </p>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            fontSize: "12px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <NavLink
                            style={{ color: "black", textDecoration: "none" }}
                            to={`/editproducts/${product.id}`}
                          >
                            <p>
                              <img
                                style={{ height: "12px", paddingRight: "5px" }}
                                src={pencil}
                              />
                              Edit
                            </p>
                          </NavLink>

                          <p
                            style={{ color: "#f90101", cursor: "pointer" }}
                            onClick={() => deleteProduct(product.id)}
                          >
                            <img
                              style={{ height: "12px", paddingRight: "5px" }}
                              src={trash}
                            />
                            Delete
                          </p>
                        </div>
                      </div>

                      <hr />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
