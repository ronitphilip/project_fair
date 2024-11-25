import React from 'react'
import authImg from '../assets/technology.jpg'
import { Form, FloatingLabel  } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Auth = ({insideRegister}) => {
  return (
    <>
      <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className="container w-50">
          <div className="card shadow p-2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img height={'500px'} src={authImg} alt="auth" />
              </div>
              <div className="col-lg-6">
                <h1 className='my-2'><i className="fa-brands fa-docker"></i> Project Fair</h1>
                <h5>Sign {insideRegister?'Up':'In'} to continue</h5>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel
                    controlId="floatingInputUsername"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Username" />
                  </FloatingLabel>
                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel 
                    controlId="floatingPassword"
                    label="Password"
                  >
                    <Form.Control type="password" placeholder="Password" />
                  </FloatingLabel>

                  {
                    insideRegister ?
                    <div className="mt-3">
                      <button className="btn btn-primary mb-2">Sign Up</button>
                      <p>Existing user? Click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button className="btn btn-primary mb-2">Log In</button>
                      <p>New user? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }

                </Form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Auth