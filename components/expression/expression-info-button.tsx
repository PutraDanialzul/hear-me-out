'use client';

import styles from "./expression-info-style.module.css"

export default function ExpressionInfoButton(){

    return (<div className={styles.infoButton}>
        <div className={styles.infoBox}>
            Everything written here remains private and can only be viewed by you. 
        </div>
    </div>);
}