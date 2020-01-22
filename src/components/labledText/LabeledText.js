import React from "react";
import styles from './LabeledText.module.scss';

const LabeledText = ({ label, text }) => {
  return (
    <div className={ styles.Container }>
      <div className={ styles.Label }>{ label }</div>
      <div className={ styles.Text }>{ text }</div>
    </div>);
};

export default LabeledText;
