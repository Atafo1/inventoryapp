import { Dashboard } from "./components/Dashboard";
import {Products} from "./components/Products";
import { AddProducts } from "./components/AddProducts";
import { EditProducts } from "./components/EditProducts";
import { HomePage } from "./HomePage";
import { Route, Routes } from 'react-router-dom';
import { Signup } from "./pages/Signup";

function App() {
 

  return (
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
       <Route path="product" element={<Products/>}/>
       <Route path="addproducts" element={<AddProducts/>}/>
         <Route path="editproducts/:id" element={<EditProducts/>}/>
         <Route path="signup" element={<Signup/>}/>

     </Routes>
  );
}

export default App;