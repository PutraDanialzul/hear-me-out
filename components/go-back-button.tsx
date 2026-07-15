'use client';

import { useRouter } from "next/navigation";
import styles from "./displayer-style.module.css"

export default function GoBackButton(){
    const router = useRouter();
    return (<button onClick={router.back} className={styles.goBack}/>);
}