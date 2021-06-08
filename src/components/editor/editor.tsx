import React, {useState} from 'react';
import styles from './editor.module.css';
import LineNumber from './lineNumber/lineNumber';

interface EditorProps {
  code: string;
  setCode: (nextCode: string) => void;
  hasLine: boolean;
  placeHolder: string;
}

const Editor = ({
                  code = 'alert("This is alert.")\n' +
                  'console.log("This is log.")', setCode, hasLine,
  placeHolder
                }: EditorProps) => {

  const [lines, setLines] = useState(2);

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
      const newLines = target.value.match(/\n/g)?.length! as number ?? 1;
      setLines(newLines + 1);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        {
          hasLine && Array.from({length: lines}, (undefined, i) => i)
            .map((v, i) => <LineNumber line={i + 1}/>)
        }
      </div>
      <textarea className={styles.editor} onPaste={onPaste} onChange={onChange}
                placeholder={placeHolder} rows={40} wrap={"off"}>{code}
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
