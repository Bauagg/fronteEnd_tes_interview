import axios from "axios"
import { useState } from "react"
import { Form, Button, CloseButton } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const Navigate = useNavigate()

    const token = localStorage.getItem('token')

    const createProduct = (e) => {
        e.preventDefault()

        if (!name || !description || !price || !stock || !image || !category) {
            return setError('Data Product tidak boleh ada yang kosong')
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('stock', stock);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('description', description);

        axios.post('http://localhost:4000/create', formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => Navigate('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div className="container">
            <div>
                <h3 className="text-center my-5">CREATE PRODUCT</h3>
                {
                    error && (
                        <div className="bg-danger py-2 createProduct px-3 mb-3 rounded d-flex justify-content-between">
                            <p className="text-white my-0">{error}</p>
                            <div data-bs-theme="dark">
                                <CloseButton onClick={() => setError('')} />
                            </div>
                        </div>
                    )
                }
                <div className="createProduct border rounded py-3 px-3">
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
                            <Button onClick={createProduct} variant="primary" className='w-100'>CREATE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct