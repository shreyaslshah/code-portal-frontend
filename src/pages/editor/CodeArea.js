import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';

function CodeArea({lang, setCode, code}) {
  return (
    <AceEditor
      className='custom-editor'
      mode={lang} // Set the mode to C and C++
      theme="tomorrow_night"
      value={code}
      onChange={setCode}
      name="my-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      style={{  width: '100%', height:'calc(100vh - 100px)',
      maxHeight: 'calc(100vh - 100px)', fontSize : '16px !important' }}
    />
  );
}

export default CodeArea