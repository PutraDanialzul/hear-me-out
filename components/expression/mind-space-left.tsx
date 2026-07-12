'use client';

import Link from "next/link";
import styles from "./mind-space-style.module.css";
import { usePathname } from "next/navigation";

export default function MindSpaceLeft(){
    const pathname = usePathname();
    const matchSize = window.matchMedia("screen and (max-width: 700px)");
    return (
    <div className={styles.leftSide}>
        <div className={styles.iconContainer}>
            <p className={styles.mindSpaceEmoji}/>
            <div className={styles.mindSpaceInfo}>
                <p style={{fontWeight: "bold", margin: "auto 0 0 0"}}>mind space</p>
                <p style={{margin: "0 0 auto 0"}}>a space for you</p>
            </div>
        </div>
        <div className={styles.linkGroup}>
            <Link className={styles.linkContainer+(pathname == "/express" || pathname == "/expression" ? " "+styles.selected : "")} href="/express">
                <p className={styles.linkEmoji}>📓</p>
                <p className={styles.linkInfo}>My Thoughts</p>
            </Link>
            <Link className={styles.linkContainer+(pathname == "/express/add" ? " "+styles.selected : "")} href="/express/add">
                <p className={styles.linkEmoji}>✏️</p>
                <p className={styles.linkInfo}>New Entry</p>
            </Link>
            <Link className={styles.linkContainer+(pathname == "/express/mood-tracker" ? " "+styles.selected : "")} href="/express/mood-tracker">
                <p className={styles.linkEmoji}>😊</p>
                <p className={styles.linkInfo}>Mood Tracker</p>
            </Link>
        </div>
    </div>);
}