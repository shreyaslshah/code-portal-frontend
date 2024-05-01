import React, { useEffect, useState } from 'react'
import './editor.css'
import Navbar from '../navbar/Navbar'
import QuestionDetails from './QuestionDetails'
import QuestionFooter from './QuestionFooter'
import Problems from './Problems'
import Leaderboard from './Leaderboard'
import CodeArea from './CodeArea'
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { Loader, Dimmer } from 'semantic-ui-react'
import { decode } from 'base-64';
import { useParams } from 'react-router-dom';
import Results from './Results'


function Editor() {

  const { contestId, questionNo } = useParams();
  const [userPoints, setUserPoints] = useState(0);
  const [contestDetails, setContestDetails] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const [results, setResults] = useState([])
  const [lang, setLang] = useState('c_cpp')
  const [status, setStatus] = useState('Unsolved')
  const [code, setCode] = React.useState('');
  const [values, setValues] = useState({
    contestId: contestId,
    questionNo: parseInt(questionNo),
    langId: 52
  })
  const [errors, setErrors] = useState({});


  useEffect(() => {
    let key = contestId + questionNo
    if (lang === 'java') {
      setValues({ ...values, langId: 62 })
      if (localStorage.getItem(contestId + questionNo) && JSON.parse(localStorage.getItem(contestId + questionNo))['lang'] === 'java') {
        let stored_value = JSON.parse(localStorage.getItem(key))
        setCode(stored_value['code'])
      }
      else {
        setCode('\/\/ Use class name Main\r\n\r\nclass Main {\r\n    public static void main(String[] args) {\r\n        \r\n    }\r\n}')
      }
    }
    else if (lang === 'python') {
      setValues({ ...values, langId: 71 })
      if (localStorage.getItem(contestId + questionNo) && JSON.parse(localStorage.getItem(contestId + questionNo))['lang'] === 'python') {
        let stored_value = JSON.parse(localStorage.getItem(key))['code']
        setCode(stored_value)
      }
      else {
        setCode('')
      }
    }
    else if (lang === 'c_cpp') {
      setValues({ ...values, langId: 52 })
      if (localStorage.getItem(contestId + questionNo) && JSON.parse(localStorage.getItem(contestId + questionNo))['lang'] === 'c_cpp') {
        let stored_value = JSON.parse(localStorage.getItem(key))['code']
        setCode(stored_value)
      } else {
        setCode('#include<bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    return 0;\n}')
      }

    }
  }, [lang, questionNo, contestId])


  const onSubmit = async () => {
    setErrors({})
    submitCode()
  }

  function setLocalStorageCode() {
    let key = contestId + questionNo
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
    let value = {
      'code': code,
      'lang': lang
    }
    localStorage.setItem(key, JSON.stringify(value))
  }
  const [submitCode, { loading: loading2 }] = useMutation(SUBMIT_CODE, {
    update(proxy, result) {
      console.log(result)
      setResults(result.data.submit)
      getUser()
      document.querySelector('.results-container').classList.remove('hide');
      setLocalStorageCode()
    },
    onError(e) {
      console.log(e)
      setErrors(e.graphQLErrors[0].extensions.errors)
    },
    variables: { ...values, code }
  })

  const [getUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setUserDetails(result.getUser)
    },
  });

  const [getContest] = useLazyQuery(GET_CONTEST, {
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setContestDetails(result.getContest)
    },
  });

  useEffect(() => {
    getUser()
    getContest({
      variables: {
        contestId
      }
    })
  }, [])

  useEffect(() => {
    setValues({ ...values, questionNo: parseInt(questionNo), contestId: contestId })
    if (contestDetails.questions) {
      for (var i = 0; i < userDetails.contests.length; i++) {
        if (userDetails.contests[i].contestId === contestId) {
          setUserPoints(userDetails.contests[i].points[questionNo])
          if (userDetails.contests[i].points[questionNo] === contestDetails.questions[questionNo].points) {
            setStatus('Accepted')
          }
          else {
            setStatus('Unsolved')
          }
        }
      }
    }
    let key = contestId + questionNo
    if (localStorage.getItem(key)) {
      let stored_value = JSON.parse(localStorage.getItem(key))
      setLang(stored_value['lang'])
    }
  }, [userDetails, questionNo, contestId])

  return (
    <>
      {
        contestDetails.questions ? (
          <>
            <Dimmer active={loading2}>
              <Loader size='massive' content="Loading" />
            </Dimmer>
            <div className={loading2 ? 'dimmed' : ''}>
              <div className='editor-outer'>
                <Results results={results}></Results>
                <Navbar />
                <div className='editor-container'>
                  <QuestionDetails questionNo={parseInt(questionNo) + 1} details={contestDetails.questions[questionNo]} userPoints={userPoints} />
                  <div className="right">
                    <CodeArea lang={lang} setCode={setCode} code={code} />
                  </div>
                </div>
                <QuestionFooter lang={lang} setLang={setLang} status={status} onSubmit={onSubmit} />
                <Problems questions={contestDetails.questions}></Problems>
              </div>
              <Leaderboard contestId={contestId}></Leaderboard>
            </div>
          </>
        ) :
          <Dimmer active={true}>
            <Loader size='massive' content="Loading" />
          </Dimmer>
      }

    </>
  )
}

const SUBMIT_CODE = gql`
  mutation Mutation($contestId: ID!, $questionNo: Int!, $langId: Int!, $code:String!) {
  submit(contestId: $contestId, questionNo: $questionNo, langId: $langId, code: $code) {
    expected_output
    stdout
    status_id
    time
    memory
    stderr
    compile_output
    stdin
  }
}
`

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

const GET_CONTEST = gql`
query GetContest($contestId: ID!) {
  getContest(contestId: $contestId) {
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
export default Editor