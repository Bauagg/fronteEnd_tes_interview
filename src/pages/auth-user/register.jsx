import "./style-user.css"
import { Link, useNavigate } from "react-router-dom"
import { Form, CloseButton } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState('')
    const Navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault()

        if (!name || !email || !password || !role) {
            return setError('Data form User harus di isi semua')
        }

        const rergexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!rergexEmail.test(email.toString())) {
            return setError('Email tidak valid')
        }

        const data = { name, email, password, role }

        axios.post('http://localhost:4000/register', data)
            .then(() => {
                Navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container justify-content-center d-flex">
            <div className="mx-2 px-4 border py-4 mt-5 rounded contenLogin">
                <h1 className="mb-3 text-center fw-bold">REGISTER</h1>
                {
                    error && (
                        <div className="bg-danger py-2 px-3 rounded d-flex justify-content-between">
                            <p className="text-white my-0">{error}</p>
                            <div data-bs-theme="dark">
                                <CloseButton onClick={() => setError('')} />
                            </div>
                        </div>
                    )
                }
                <label className="w-100 my-3">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control w-100" id="exampleFormControlInput1" placeholder="Username" />
                </label>
                <label className="w-100">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-100" id="exampleFormControlInput1" placeholder="Email@gmail.com" />
                </label>
                <label className="w-100 my-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control w-100" id="exampleFormControlInput1" placeholder="Password" />
                </label>
                <label className="w-100 mb-3">
                    <Form.Select onChange={(e) => setRole(e.target.value)} aria-label="Default select example">
                        <option >Pilih Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Form.Select>
                </label>
                <button onClick={registerUser} className="w-100 bg-primary border-0 text-white py-2 rounded">REGISTER</button>
                <p>Anda sudah punya Akun ? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register