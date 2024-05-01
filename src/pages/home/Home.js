import React from 'react'
import Component1 from '../home-component1/Component1'
import Component2 from '../home-component2/Component2'
import Navbar from '../navbar/Navbar'
import './home.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client/react/hooks';
import { Loader, Dimmer } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_CONTESTS);

  return (
    <>
      {data ?
        <>
          <div className='home-container'>
            <Navbar />
            <label className='line-after'><span className='title'>Contests</span></label>
            {
              data ? (data.getContests.map((contest, id) => {
                if (id % 2 == 0)
                  return <Component1 title={contest.title} description={contest.description} start={contest.start} end={contest.end} image={contest.image} id={contest.id} />
                else
                  return <Component2 title={contest.title} description={contest.description} start={contest.start} end={contest.end} image={contest.image} id={contest.id} />
              })) : null
            }
          </div>
        </> :
        <Dimmer active={loading}>
          <Loader size='massive' content="Loading" />
        </Dimmer>
      }

    </>
  )
}


const GET_CONTESTS = gql`
query GetContests {
  getContests {
    id
    title
    description
    start
    end
    image
    questions {
      title
      description
      difficulty
      points
      sampleInput
      sampleOutput
      timeLimit
      memoryLimit
      testcases {
        input
        output
      }
    }
  }
}
`
export default Home