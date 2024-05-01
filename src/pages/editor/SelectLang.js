import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react';


function SelectLang({lang, setLang}) {
  const options = [
    { key: 'c_cpp', text: 'C/C++', value: 'c_cpp' },
    { key: 'java', text: 'Java', value: 'java' },
    { key: 'python', text: 'Python', value: 'python' },
  ];

  const handleChange = (event, data) => {
    setLang(data.value)
  };

  return (
    <Dropdown id='select-lang' value={lang} fluid selection options={options}  onChange={handleChange} />
  )
}

export default SelectLang