import React from 'react';
import SimpleEditor from "react-simple-code-editor";
import {Grammar, highlight, languages} from 'prismjs';
import styles from './editor.module.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/components/prism-css';
import LineNumber from './lineNumber/lineNumber';

interface EditorProps {
  code: string;
  setCode: (nextCode: string) => void;
  lines: number;
  setLines: (nextLine: number) => void;
}

const Editor = ({code, setCode, lines, setLines}: EditorProps) => {
  const spaceLength = 9;
  const spaceTemplate = (totalLength: number, current: number) => {
    const currentLen = String(current).length;
    return ' '.repeat(totalLength - (currentLen) * 2);
  }
  const codeWithLineNumbers = (code: string, language: Grammar) =>
    highlight(code, language, 'js')
      .split("\n")
      .map((line, i) => {
        const space = spaceTemplate(spaceLength, i + 1);
        // const trimmedLine = line.replaceAll('\t', '        ');
        return (`<span className={styles.editorLineNumber}>${i + 1}</span><span>${space}</span>${line}`
        )
      })
      .join("\n");

  const onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData;
    const textData = pastedData?.getData('Text');
    const {target} = event;
    if (target instanceof HTMLTextAreaElement && textData) {
      const newLines = textData.match(/\n/g)?.length! as number | 1;
      setLines(newLines + 1);
      if (target.selectionEnd - target.selectionStart > 0) {
        target.setRangeText('', target.selectionStart, target.selectionEnd, 'end');
      }
      target.setRangeText(textData, target.selectionStart, target.selectionEnd, 'end');
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const newLines = lines + 1;
      setLines(newLines);
    } else if (event.key === 'Backspace') {
      const {target} = event;
      if (target instanceof HTMLTextAreaElement &&
        target.value && target.value[target.selectionStart-1] === '\n') {
        const newLines = lines - 1;
        setLines(newLines);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div>
        {
          Array.from({length: lines}, (undefined, i) => i)
            .map((v, i) => <LineNumber line={i + 1}/>)
        }
      </div>
      <textarea className={styles.editor} onPaste={onPaste} onKeyDown={onKeyDown}
                placeholder={"Wait for code..."} rows={40}>{code}
      </textarea>
    </div>
    // <SimpleEditor
    //   className={styles.editor}
    //   textareaClassName={styles.codeArea}
    //   value={code}
    //   ignoreTabKey={true}
    //   onValueChange={(nextCode) => setCode(nextCode)}
    //   highlight={(code) => codeWithLineNumbers(code, languages.js)}
    //   insertSpaces={true}
    //   padding={10}
    //   style={{
    //     fontSize: 14,
    //     outline: 0
    //   }}
    // />
  );
}

export default Editor;
