import React, { useContext, useState } from 'react'
import { Form, Loader, Dimmer } from 'semantic-ui-react'
import './signin.css'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client'
import { Navigate } from "react-router-dom";


function Signin() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({})
    login();
  }

  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login)
      navigate('/')
    },
    onError(e) {
      setErrors(e.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })
  if (!localStorage.getItem("jwtToken")) {
  return (
    <>
      <Dimmer active={loading}>
        <Loader size='massive' content="Loading" />
      </Dimmer>
      <div className={loading ? 'dimmed' : ''}>
        <div className='signin-container'>
          <div className="left">
            <div className="child">
              <div className='type-container'>
                <div className="typing">
                  printf(“Hello World”);
                </div>
              </div>
              <div className="question">
                Do not have an account?
              </div>
              <a href="/signup">
                <div className="button">
                  Sign Up
                </div>
              </a>
            </div>
          </div>
          <div className="right">
            <div className="child">
              <div className="title">Sign In</div>
              <div className="form">
                <Form>
                  <Form.Field>
                    <label>Email ID</label>
                    <Form.Input error={errors.email ? true : false} name='email' value={values.email} onChange={onChange} placeholder='Email ID' />
                    {errors.email ? (<div className='error'>{errors.email}</div>) : null}
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input type={'password'} placeholder='Password' error={errors.password ? true : false} name='password' value={values.password} onChange={onChange} />
                    {errors.password ? (<div className='error'>{errors.password}</div>) : null}
                  </Form.Field>
                  <div className="button" onClick={handleLogin}>
                    Sign In
                  </div>
                  <div className='forgot'>Forgot password?</div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  }
  else {
    return <Navigate to="/" replace />;
  }
}

const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    username
    email
    token
    isAdmin
    isVerified
    phone
    college
    contests {
      contestTitle
      points
    }
  }
}
`

export default Signin