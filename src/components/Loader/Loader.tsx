import styles from './Loader.module.css';
import { Component } from 'react';

class Loader extends Component {
  render() {
    return <span className={styles.loader}></span>;
  }
}

export default Loader;
