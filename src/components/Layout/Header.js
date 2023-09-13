import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

export default function Header() {
  const [loginUser,setLoginUser]= useState('')
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user)
    }
  },[]);

  const logoutHandler =()=>{
    localStorage.removeItem('user');
    message.success('Logout Successfully');
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <Link className="navbar-brand" to="/">Expense Management </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <p  className='nav-link active'>
                {loginUser && loginUser.name}
                </p>
              </li>
              <li class="nav-item">
                <li
                onClick={logoutHandler}
                className='btn btn-primary'
                aria-current='page'
                >
                    Logout
                </li>
              
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
