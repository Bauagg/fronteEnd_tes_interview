import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom"

const NavbarComponen = () => {
    const Navigate = useNavigate()
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        Navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <Link className="navbar-brand text-white" href="#">A. Mambaus Sholihin</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to='/'>Home</Link>
                            </li>
                            {
                                role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link active text-white" aria-current="page" to='/create-product'>Create Product</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='d-none d-lg-block'>
                        {
                            token && role ? (
                                <button onClick={logout} className='ms-2 border-0 rounded px-2 py-1'>Logout</button>
                            ) : (
                                <div className='d-flex'>
                                    <button onClick={() => Navigate('/login')} className='border-0 rounded px-2 py-1'>Login</button>
                                    <button onClick={() => Navigate('/register')} className='ms-2 border-0 rounded px-2 py-1'>Register</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarComponen