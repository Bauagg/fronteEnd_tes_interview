import { useEffect, useState } from "react"
import { CloseButton, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { product, toggleUpdateProduct } from "../../redux/action/action"
import axios from "axios"

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const productData = useSelector((state) => state.productDate)
    const dispatch = useDispatch()

    console.log(productData.idProduct)

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`http://localhost:4000/detail/${productData.idProduct}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                console.log(result.data.datas)
                setName(result.data.datas.name)
                setStock(result.data.datas.stock)
                setCategory(result.data.datas.category)
                setDescription(result.data.datas.description)
                setPrice(result.data.datas.price)
            })
            .catch((err) => console.log(err))
    }, [productData.idProduct, token])

    const updateProduct = (e) => {
        e.preventDefault()

        const formData = new FormData();
        if (name) formData.append('name', name);
        if (price) formData.append('price', price);
        if (stock) formData.append('stock', stock);
        if (description) formData.append('description', description);
        if (category) formData.append('category', category);
        if (image) formData.append('image', image);

        axios.put(`http://localhost:4000/update/${productData.idProduct}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:4000/list', { headers: { Authorization: `Bearer ${token}` } })
                    .then((result) => {
                        dispatch(product(result.data.datas))
                        dispatch(toggleUpdateProduct())
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="contenUpdateProduct border rounded">
            <div className="d-flex justify-content-between mb-3">
                <h5>Update Product</h5>
                <CloseButton onClick={() => dispatch(toggleUpdateProduct())} />
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-2">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control inputCreateProduct" placeholder="Name Product" />
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control inputCreateProduct" placeholder="Harga Product" />
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="form-control inputCreateProduct" placeholder="Stok Product" />
                </div>
                <div className="col-12 col-md-6 mb-2">
                    <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                        <option >Pilih Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                    </Form.Select>
                </div>
                <div className="col-12 mb-2">
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control inputCreateProduct" placeholder="image" />
                </div>
                <div className="col-12 mb-2">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" rows="3" />
                </div>
                <div className="col-12">
                    <Button onClick={updateProduct} variant="primary" className='w-100'>UPDATE</Button>
                </div>
            </div>
        </div >
    )
}

export default UpdateProduct