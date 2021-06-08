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
          <div className={styles.editor}>
            <p>aasdfsdfsdf</p>
              <Editor code={code} setCode={setCode}
                      hasLine={hasLine} placeHolder={placeHolder}
              />
            <p>asdfsdafsdf</p>
          </div>
      </div>
  );
}

export default App;
