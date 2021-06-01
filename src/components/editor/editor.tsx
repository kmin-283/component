import React from 'react';
import SimpleEditor from "react-simple-code-editor";
import {Grammar, highlight, languages} from 'prismjs';
import styles from './editor.module.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

interface EditorProps {
    graphValue: string;
    setGraphValue: (graphValue: string) => void;
}

const Editor = ({graphValue, setGraphValue}:EditorProps) => {
  const codeWithLineNumbers = (code: string, language: Grammar) =>
    highlight(code, language, 'js')
      .split("\n")
      .map((line, i) => `<span className={styles.editorLineNumber}>${i + 1}</span>  ${line}`)
      .join("\n");

    return (
  <SimpleEditor
    className={styles.editor}
    textareaId={styles.codeArea}
    value={graphValue}
    onValueChange={(code) => setGraphValue(code)}
    highlight={(code) => codeWithLineNumbers(code, languages.markup)}
    insertSpaces={true}
    padding={10}
    style={{
        fontSize: 18,
        outline: 0
    }}
  />
    );
}

export default Editor;

