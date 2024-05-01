import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import './dashboard.css'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom';
import { gql, useQuery, useLazyQuery } from '@apollo/client'


//CHECK TABLE

function Dashboard() {
  const [userDetails, setUserDetails] = useState({})
  const navigate = useNavigate();
  const context = useContext(AuthContext)


  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setUserDetails(result.getUser)
    },
  });

  const handleLogout = (e) => {
    context.logout()
    navigate('/');
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className='db-container'>
      <Navbar />
      <label class='line-after'><span className='title'>User Dashboard</span></label>
      <div className='flex-box'>
        <div className='details-box'>
          <div className='inner'>
            <div className='info-desc'>
              <span className='info-title'>username : </span>
              <span className='info'>{userDetails.username}</span>
            </div>
            <br />
            <div className='info-desc'>
              <span className='info-title'>college : </span>
              <span className='info'>{userDetails.college}</span>
            </div>
            <br />
            <div className='info-desc'>
              <span className='info-title'>phone : </span>
              <span className='info'>{userDetails.phone}</span>
            </div>
            <br />
            <div className='info-desc'>
              <span className='info-title'>email : </span>
              <span className='info'>{userDetails.email}</span>
            </div>
            <div className="button" onClick={handleLogout} >
              Logout
            </div>
          </div>
          <div className="vertical-line"></div>
        </div>
        <div className='statistics'>
          <div className='inner-2'>
            <div className="row-head">
              <div className="table-head">Contest</div>
              <div className="table-head">Score</div>
            </div>
            {userDetails.contests && userDetails.contests.map((contest, id) => {
              var sum = contest.points.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
              return (
                <>
                <div className="contest-data">
                  <div className="contest-name">{contest.contestTitle}</div>
                  <div className="score">{sum}</div>
                </div>
                                  
                <hr className='problems-line-dashboard' />
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const GET_USER = gql`
{
  getUser {
    id
    username
    email
    token
    isAdmin
    isVerified
    phone
    college
    contests {
      contestId
      contestTitle
      points
    }
  }
}
`

export default Dashboard