import React, {useState} from 'react';
import styles from './App.module.css';
import './App.module.css';
import Editor from "./components/editor/editor";
import Graph from "./components/graph/graph";

function App() {
    const [graphValue, setGraphValue] = useState('');
  return (
      <div className={styles.container}>
          <div className={styles.editor}>
              <Editor graphValue={graphValue} setGraphValue={setGraphValue}/>
          </div>
          <div className={styles.graph}>
              <Graph/>
          </div>
      </div>
  );
}

export default App;
