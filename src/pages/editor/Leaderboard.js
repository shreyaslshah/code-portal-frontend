import React, { useEffect,useState } from 'react'
import { GiTrophy } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

function Leaderboard({ contestId }) {
  const [leaderboard, setLeaderboard] = useState([])
  function hideLeaderboard() {
    document.querySelector('.leaderboard-popup').classList.add('hide');
  }
  const [getLeaderboard] = useLazyQuery(GET_LEADERBOARD, {
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setLeaderboard(result.leaderboard)
    }
  });
 
  useEffect(() => {
    getLeaderboard({
      variables: {
        contestId
      }
    })
  },[])
  return (
    <div className='leaderboard-popup hide' >
      <div className="title">Leaderboard<GiTrophy className='trophy'></GiTrophy></div>
      <hr className='leaderboard-line' />
      <div className='content'>
        <RxCross2 className='leaderboard-cross' onClick={hideLeaderboard}></RxCross2>
        <div className='leaderboard-heading'>
          <div>Rank</div>
          <div>Name</div>
          <div>Points</div>
        </div>
        <div className="details-container">
          {leaderboard && leaderboard.map((user, id) => {
            return (
              <div className="details">
                <div>{id+1}</div>
                <div>{user.username}</div>
                <div>{user.points}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const GET_LEADERBOARD = gql`
query Query($contestId: ID!) {
  leaderboard(contestId: $contestId) {
    username
    points
  }
}
`
export default Leaderboard