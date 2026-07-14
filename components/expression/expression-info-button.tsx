'use client';

import styles from "./expression-info-style.module.css"

export default function ExpressionInfoButton(){

    return (<span>
        <div className={styles.infoButton}/>
        <div className={styles.infoBox}>
            All of the secrets can only be seen by you. 
        </div>
    </span>);
}