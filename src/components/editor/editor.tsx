import React, { useState, useEffect } from 'react';
import { Grammar, highlight, languages } from 'prismjs';
import styles from './editor.module.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-css';
import LineNumber from './lineNumber/lineNumber';

interface EditorProps {
  code: string;
  setCode: (nextCode: string) => void;
  hasLine: boolean;
  placeHolder: string;
  // containerClassName: string;
  // editorClassName: string;

}

const Editor = ({
                  code = 'function helloWorld() { \n' +
                  'console.log(world); \n' +
                  '}', setCode, hasLine,
                  placeHolder
                }: EditorProps) => {

  useEffect(() => {
    const highlighted = highlight(code, languages.js, 'js');
    const pre = document.querySelector('pre');
    pre!.innerHTML = highlighted;
    } , []);
  const [lines, setLines] = useState(3);

  const onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {


    const pastedData = event.clipboardData;
    const textData = pastedData?.getData('Text');
    const {target} = event;
    if (target instanceof HTMLTextAreaElement && textData) {
      if (target.selectionEnd - target.selectionStart > 0) {
        target.setRangeText('', target.selectionStart, target.selectionEnd, 'end');
      }
      target.setRangeText(textData, target.selectionStart, target.selectionEnd, 'end');
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {target} = event;
    if (target instanceof HTMLTextAreaElement) {
      const highlighted = highlight(target.value, languages.js, 'js');
      const pre = document.querySelector('pre');
      setCode(highlighted);
      pre!.innerHTML = highlighted;
      const newLines = target.value.match(/\n/g)?.length! as number ?? 1;
      setLines(newLines + 1);
    }
  }
  const textarea = hasLine ? `${styles.textareaNumbered}` : `${styles.textarea}`;
  const editor = hasLine ? `${styles.editorNumbered}` : `${styles.editor}`;
  const pre = editor + ` ${styles.highlight}`;

  return (
    <div className={styles.container}>
      <div className={styles.lineNumber}>
        {
          hasLine && Array.from({length: lines}, (undefined, i) => i)
            .map((v, i) => <LineNumber line={i + 1}/>)
        }
      </div>
      <textarea className={textarea} onPaste={onPaste} onChange={onChange}
                placeholder={placeHolder} wrap={"off"} defaultValue={code}>
      </textarea>
      <pre className={pre}>
      </pre>
    </div>
  );
}

export default Editor;
