import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FaPlus, FaMinus } from "react-icons/fa6";

const DetailProduct = () => {
    const [dataProduct, setDataProduct] = useState({})
    const [qty, setQty] = useState(0)
    const { id } = useParams()

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`http://localhost:4000/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setDataProduct(result.data.datas)
            })
            .catch((err) => console.log(err))
    }, [id, token])

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-xxl-6 col-xl-6 col-md-12 col-sm-12 col-12">
                    <img alt="gambar product" src={dataProduct.image} className="imageDetailProduct" />
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6 col-sm-12 col-12 px-5">
                    <h1>{dataProduct.name}</h1>
                    <div className="d-flex justify-content-between border-bottom mt-4">
                        <p className="my-0">Price :</p>
                        <p className="my-0 fw-bold">Rp. 16000</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom mt-4">
                        <p className="my-0">Stock :</p>
                        <p className="my-0 fw-bold">{dataProduct.stock}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom mt-4">
                        <p className="my-0">Category :</p>
                        <p className="my-0 fw-bold">{dataProduct.category}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom mt-4">
                        <button onClick={() => setQty(qty + 1)} className="border-0 bg-primary px-3 rounded"><FaPlus className="text-white" /></button>
                        <input value={qty} type="number" className="form-control mx-4 text-center" disabled placeholder="Quantity" />
                        <button onClick={() => {
                            if (qty > 1) {
                                setQty(qty - 1)
                            }
                        }} className="border-0 bg-primary px-3 rounded"><FaMinus className="text-white" /></button>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="border-bottom border-2 border-warning">
                    <h1 className="text-warning">Description</h1>
                </div>
                <p className="mt-3">{dataProduct.description}</p>
            </div>
        </div>
    )
}

export default DetailProduct