import React, {useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import Editor from "./components/editor/editor";

function App() {
    const [code, setCode] = useState('alert("This is alert.")\n' +
      'console.log("This is log.")');
    const [hasLine, setHasLine] = useState(true);
    const [placeHolder, setPlaceHolder] = useState('Wait for code...');
  return (
      <div className={styles.container}>
          <div className={styles.editor}>
              <Editor code={code} setCode={setCode}
                      hasLine={hasLine} placeHolder={placeHolder}
              />
          </div>
      </div>
  );
}

export default App;
