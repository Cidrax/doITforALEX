import React from 'react';

import styles from './CustomHeader.module.scss';

const CustomHeader = ({ children }) => (<div className={ styles.Header }> { children } </div>);
export default CustomHeader;
