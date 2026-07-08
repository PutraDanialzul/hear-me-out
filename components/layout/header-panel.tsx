"use client";

import Image from "next/image";
import styles from "./header-style.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFrames } from "next/dist/next-devtools/dev-overlay/utils/get-error-by-type";
import { time } from "console";

export default function HeaderPanel(){

    
    return(
        <header className={styles.header}>
            <div className={styles.logoContainer}>

            </div>
            <div className={styles.linkContainer}>
                <Link href="/">Confessions</Link>
                <Link href="/confess">Express Yourself</Link>
                <button>Test 3</button>
            </div>
        </header>
    );
}