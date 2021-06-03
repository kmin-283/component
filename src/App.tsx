import React, {useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import Editor from "./components/editor/editor";

function App() {
    const [code, setCode] = useState('');
    const [cacheLines, setCacheLines] = useState(0);
    const [lines, setLines] = useState(1);
  return (
      <div className={styles.container}>
          <div className={styles.editor}>
              <Editor code={code} setCode={setCode} lines={lines} setLines={setLines}
              cacheLines={cacheLines} setCacheLines={setCacheLines}/>
          </div>
      </div>
  );
}

export default App;
