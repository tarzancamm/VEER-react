import React from "react";
import styles from './HowToVeer.module.css'

const HowToVeer = () => {
  return (
    <div className={styles.howto}>
      <h1>Find Things To Do In Europe</h1>
      <div className={styles.container}>
        <div className={styles.howtoitem}>
            <img src="" alt="" />
            <p>Create a Free Profile</p>
        </div>
        <div className={styles.howtoitem}>
            <img src="" alt="" />
            <p>VEER Into An Adventure</p>
        </div>
        <div className={styles.howtoitem}>
            <img src="" alt="" />
            <p>Save Your Favorite Adventures</p>
        </div>
      </div>
    </div>
  );
};

export default HowToVeer;
