'use client';

import { useEffect, useState } from "react";
import styles from "./expression-info-style.module.css"

export default function ExpressionInfoButton(){

    const [showInfo, setShowInfo] = useState(false);

    const infoBox = (<div className={styles.infoBox}>
        All of the secrets can only be seen by you. 
    </div>);

    useEffect(()=>{
        setShowInfo(false);
    }, []);

    return (<span>
        <span onClick={()=>{setShowInfo(prev => !prev);}} className={styles.infoButton}/>
        {showInfo ? infoBox : null}
    </span>);
}