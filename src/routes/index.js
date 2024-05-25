import { Route, Routes } from "react-router-dom"
import NavbarComponen from "../pages/navbarComponen"
import Product from "../pages/product/product"
import Login from "../pages/auth-user/login"
import Register from "../pages/auth-user/register"
import CreateProduct from "../pages/product/create-product"
import DetailProduct from "../pages/product/detail-Product"


const RouterAplication = () => {

    return (
        <div>
            <NavbarComponen />

            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/detail/:id" element={<DetailProduct />} />
            </Routes>
        </div>
    )
}

export default RouterAplication