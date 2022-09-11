import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

import classes from './Spinner.module.css';

function Spinner() {
  return (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  );
}

export default Spinner;
