import "./style-user.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CloseButton } from "react-bootstrap"
import axios from "axios"

const Login = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()

        if (!email || !password) {
            return setError('Email & Password harus di isi')
        }

        const rergexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!rergexEmail.test(email.toString())) {
            return setError('Email tidak valid')
        }

        axios.post('http://localhost:4000/login', { email, password })
            .then((result) => {
                console.log(result.data.datas.name)
                localStorage.setItem('token', result.data.datas.token)
                localStorage.setItem('role', result.data.datas.role)
                localStorage.setItem('name', result.data.datas.name)
                Navigate('/')
            })
            .catch((err) => setError(err.response.data.message))

    }

    return (
        <div className="container justify-content-center d-flex">
            <div className="mx-2 px-4 border py-4 mt-5 rounded contenLogin">
                <h1 className="mb-3 text-center fw-bold">LOGIN</h1>
                {
                    error && (
                        <div className="bg-danger py-2 px-3 mb-3 rounded d-flex justify-content-between">
                            <p className="text-white my-0">{error}</p>
                            <div data-bs-theme="dark">
                                <CloseButton onClick={() => setError('')} />
                            </div>
                        </div>
                    )
                }
                <label className="w-100">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control w-100" id="exampleFormControlInput1" placeholder="email@gmail.com" />
                </label>
                <label className="w-100 my-3">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control w-100" id="exampleFormControlInput1" placeholder="passwxxxxxx" />
                </label>
                <button onClick={login} className="w-100 bg-primary border-0 text-white py-2 rounded">LOGIN</button>
                <p>Anda belom punya Akun ? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login