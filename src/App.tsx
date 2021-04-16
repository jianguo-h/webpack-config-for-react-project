import React from 'react';
import styles from './styles/app.module.less';

console.log(styles);

function App() {
  return (
    <div id='root' className={styles.root}>
      hello world! this is a react project
    </div>
  );
}

export default App;
