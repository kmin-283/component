import React, {useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import Editor from "./components/editor/editor";

function App() {
    const [code, setCode] = useState('');
    const [lines, setLines] = useState(1);
  return (
      <div className={styles.container}>
          <div className={styles.editor}>
              <Editor code={code} setCode={setCode} lines={lines} setLines={setLines}
              />
          </div>
      </div>
  );
}

export default App;
