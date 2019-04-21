import React, { PureComponent } from 'react';
import styles from './index.module.scss';

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footerContainer}>
        <h2 className={styles.title}>
          弼马温BOSS管理系统
        </h2>
        <div className={styles.copyright}>
          &copy; 2019 弼马温
        </div>
      </div>
    );
  }
}
