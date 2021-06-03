import React from 'react';
import styles from './lineNumber.module.css';

interface LineNumberProps {
  line: number;
}

const LineNumber = ({line}: LineNumberProps) => {
  return (
  <div className={styles.number}>{line}</div>
)};

export default LineNumber;