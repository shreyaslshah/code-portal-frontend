import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { Form, Loader, Dimmer } from 'semantic-ui-react'
import './signup.css'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { Navigate } from "react-router-dom";

function Signup() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(false)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    otp: null,
  })
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleOtp = (e) => {
    e.preventDefault();
    setErrors({})
    getOtp();
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    await setValues({ ...values, otp: parseInt(values.otp) })
    setErrors({})
    addUser()
  }
  const [getOtp, { loading: loading1, error: error1, data: data1 }] = useMutation(GET_OTP, {
    update(proxy, result) {
      setOtp(true)
    },
    onError(e) {
      setErrors(e.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })

  const [addUser, { loading: loading2, error: error2, data: data2 }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register)
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
        <Dimmer active={loading1 || loading2}>
          <Loader size='massive' content="Loading" />
        </Dimmer>
        <div className={(loading1 || loading2) ? 'dimmed' : ''}>
          <div className='signup-container'>
            <div className="left">
              <div className="child">
                <div className="title">Sign Up</div>
                <div className="form">
                  <Form>
                    {
                      otp ? (
                        <>
                          <Form.Field>
                            <label>
                              The OTP has been sent to your mail, check your spam folder as well
                            </label>
                            <Form.Input type='number' error={errors.otp ? true : false} name='otp' value={values.otp} onChange={onChange} placeholder='OTP' />
                            {errors.otp ? (<div className='error'>{errors.otp}</div>) : null}
                          </Form.Field>
                          <div onClick={handleRegister} className='button'>Sign Up</div>
                        </>
                      ) : (
                        <>
                          <Form.Field>
                            <label>Email ID</label>
                            <Form.Input error={errors.email ? true : false} name='email' value={values.email} onChange={onChange} placeholder='Email ID' />
                            {errors.email ? (<div className='error'>{errors.email}</div>) : null}
                          </Form.Field>
                          <Form.Field>
                            <label>Username</label>
                            <Form.Input error={errors.username ? true : false} name='username' value={values.username} onChange={onChange} placeholder='Username' />
                            {errors.username ? (<div className='error'>{errors.username}</div>) : null}
                          </Form.Field>
                          <Form.Field>
                            <label>Phone</label>
                            <Form.Input error={errors.phone ? true : false} name='phone' value={values.phone} onChange={onChange} placeholder='Phone' />
                            {errors.phone ? (<div className='error'>{errors.phone}</div>) : null}
                          </Form.Field>
                          <Form.Field>
                            <label>College</label>
                            <Form.Input error={errors.college ? true : false} name='college' value={values.college} onChange={onChange} placeholder='College' />
                            {errors.college ? (<div className='error'>{errors.college}</div>) : null}
                          </Form.Field>
                          <Form.Field>
                            <label>Password</label>
                            <Form.Input error={errors.password ? true : false} name='password' value={values.password} onChange={onChange} type={'password'} placeholder='Password' />
                            {errors.password ? (<div className='error'>{errors.password}</div>) : null}
                          </Form.Field>
                          <div className="button" onClick={handleOtp}>
                            Get OTP
                          </div>
                        </>
                      )
                    }
                  </Form>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="child">
                <div className='type-container'>
                  <div className="typing">
                    printf(“Hello World”);
                  </div>
                </div>
                <div className="question">
                  Already have an account?
                </div>
                <a href="/login">
                  <div className="button">
                    Sign In
                  </div>
                </a>
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

const GET_OTP = gql`
mutation GetOtp(
  $username: String!,
  $email: String!,
  $password: String!,
  $phone: String!,
  $college: String!
) {
  getOtp(getOtpInput:{
    username: $username,
    email: $email,
    password: $password,
    phone: $phone,
    college: $college
  }) {
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

const REGISTER_USER = gql`
mutation Register(
  $username: String!,
  $email: String!,
  $password: String!,
  $phone: String!,
  $college: String!,
  $otp: Int!
) {
  register(registerInput: {
    username: $username,
    email: $email,
    password: $password,
    phone: $phone,
    college: $college,
    otp: $otp
  }) {
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

export default Signup