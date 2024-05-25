import { useEffect, useState } from 'react';
import './style-product.css'
import { Nav, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { product, toggleUpdateProduct, payloadIdProduct } from '../../redux/action/action'
import UpdateProduct from './updateProduct';

const Product = () => {
    const [toggleSearch, setToggleSearch] = useState(true)
    const [toggleCategory, setToggleCategory] = useState(false)
    const dispatch = useDispatch()
    const productData = useSelector((state) => state.productDate)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const Navigate = useNavigate()

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect(() => {
        let url
        if (token) {
            url = `http://localhost:4000/list?`
        } else {
            url = `http://localhost:4000/?`
        }
        if (search !== '' && category === '') {
            url += `search=${search}`
        } else if (search === '' && category !== '') {
            url += `category=${category}`
        } else if (search !== '' && category !== '') {
            url += `search=${search}&category=${category}`
        }
        if (token) {
            axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
                .then((result) => {
                    dispatch(product(result.data.datas))
                })
                .catch((err) => console.log(err))
        } else {
            axios.get(url)
                .then((result) => {
                    dispatch(product(result.data.datas))
                })
                .catch((err) => console.log(err))
        }
    }, [dispatch, search, category, token])

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:4000/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((tes) => {
                console.log(tes)
                axios.get('http://localhost:4000/')
                    .then((result) => {
                        dispatch(product(result.data.datas))
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='container'>
            <div className='navbarMenu'>
                <Nav className='mt-5' variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setToggleCategory(false)
                            setToggleSearch(true)
                        }}>Search</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => {
                            setToggleCategory(true)
                            setToggleSearch(false)
                        }} >Category</Nav.Link>
                    </Nav.Item>
                </Nav>
                {
                    toggleSearch && (
                        <input type="text" value={search} onChange={(e) => {
                            setSearch(e.target.value)
                            setCategory('')
                        }} className="form-control mt-1 w-100" id="exampleFormControlInput1" placeholder="Name Product" />
                    )
                }
                {
                    toggleCategory && (
                        <div className='d-flex justify-content-between'>
                            <Link className='text-decoration-none linkCategory' onClick={() => {
                                setCategory('Electronics')
                                setSearch('')
                            }}>Electronics</Link>
                            <Link className='text-decoration-none linkCategory' onClick={() => {
                                setCategory('Books')
                                setSearch('')
                            }}>Books</Link>
                            <Link className='text-decoration-none linkCategory' onClick={() => {
                                setCategory('Clothing')
                                setSearch('')
                            }}>Clothing</Link>
                            <Link className='text-decoration-none linkCategory' onClick={() => {
                                setCategory('Home')
                                setSearch('')
                            }}>Home</Link>
                            <Link className='text-decoration-none linkCategory' onClick={() => {
                                setCategory('Sports')
                                setSearch('')
                            }}>Sports</Link>
                        </div>
                    )
                }
            </div>
            <div className='row mt-5'>
                {
                    productData.productAll.map((data, index) => (
                        <div key={index} className='col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <Card style={{ width: '100%' }}>
                                <Card.Img className='imageProduct' variant="top" src={data.image} />
                                <Card.Body>
                                    <Card.Title className="text-truncate-1-line">{data.name}</Card.Title>
                                    <div className='d-flex justify-content-between'>
                                        <p>{data.category}</p>
                                        <p>Rp. {data.price}</p>
                                    </div>
                                    <Card.Text className="text-truncate-2-lines">
                                        {data.description}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => Navigate(`/detail/${data._id}`)} className='w-100'>GET</Button>
                                    {
                                        token && role === 'admin' && (
                                            <div>
                                                <Button onClick={() => {
                                                    dispatch(toggleUpdateProduct())
                                                    dispatch(payloadIdProduct(data._id))
                                                }} variant="warning" className='w-100 my-1'>UPDATE</Button>
                                                <Button onClick={() => deleteProduct(data._id)} variant="danger" className='w-100'>DELETE</Button>
                                            </div>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </div>
            {
                productData.toggleupdateProduct && (
                    <div className='overlay'>
                        <UpdateProduct />
                    </div>
                )
            }
        </div>
    )
}

export default Product