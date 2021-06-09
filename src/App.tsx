import React, {useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import Editor from "./components/editor/editor";

function App() {
    const [code, setCode] = useState('function helloWorld() {\n' +
      '  console.log(world);\n' +
      '}');
    const [hasLine, setHasLine] = useState(true);
    const [placeHolder, setPlaceHolder] = useState('Wait for code...');
  return (
      <div className={styles.container}>
            <p>aasdfsdfsdf</p>
          <div className={styles.editor}>
              <Editor code={code} setCode={setCode}
                      hasLine={hasLine} placeHolder={placeHolder}
              />
          </div>
            <p>asdfsdafsdf</p>
      </div>
  );
}

export default App;
