import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useEffect, useState } from 'react';
import { Base64 } from "js-base64";

function Results({ results }) {

  function hideResults() {
    document.querySelector('.results-container').classList.add('hide');
  }

  const [testCasesPassed, setTestCasesPassed] = useState(0);
  const [totalTestCases, setTotalTestCases] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [expectedInput, setExpectedInput] = useState('');
  const [stderr, setStderr] = useState('');
  const [stdout, setStdout] = useState('');
  const [compileError, setCompileError] = useState('');



  useEffect(() => {
    if (results.length) {
      setTestCasesPassed(0)
      setExpectedInput('')
      setExpectedOutput('')
      setStderr('')
      setStdout('')
      setCompileError('')
      setTotalTestCases(results.length)
      let p = 0;
      for (let i = 0; i < results.length; i++) {
        if (results[i].status_id === 3) {
          p++;
        }
        else {
          setExpectedInput(Base64.decode(results[i].stdin))
          setExpectedOutput(Base64.decode(results[i].expected_output))
          setStderr(results[i].stderr ? Base64.decode(results[i].stderr) : '')
          setStdout(results[i].stdout ? Base64.decode(results[i].stdout) : '')
          setCompileError(results[i].compile_output ? Base64.decode(results[i].compile_output) : '')
          if (results[i].status_id === 5) {
            setStderr('Time Limit Exceeded')
          }
          break;
        }
      }
      setTestCasesPassed(p);
    }
  }, [results])


  return (
    <div className='results-container hide'>
      <div className='header'>
        <span>
          Output Window
        </span>
        <span>
          <RxCross2 className='results-cross' onClick={hideResults}></RxCross2>
        </span>
      </div>
      <div className="content">
        <div className="title">
          Test Cases Passed: {testCasesPassed}/{totalTestCases}
        </div>
        {
          totalTestCases !== testCasesPassed ? (
            <>
              <div className="title">
                Expected Input:
              </div>
              {expectedInput}
              <div className="title">
                Expected Output:
              </div>
              {expectedOutput}
            </>
          ) : null
        }
        {
          (stdout || (totalTestCases !== testCasesPassed)) ? <>
            <div className="title">
              Stdout:
            </div>
            {stdout}
          </> : null
        }
        {
          stderr ? <>
            <div className="title">
              Stderr:
            </div>
            {stderr}
          </> : null
        }
        {
          compileError ? <>
            <div className="title">
              Compile Error:
            </div>
            {compileError}
          </> : null
        }
      </div>
    </div>
  )
}

export default Results