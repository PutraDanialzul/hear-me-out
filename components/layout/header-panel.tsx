"use client";

import Image from "next/image";
import styles from "./header-style.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFrames } from "next/dist/next-devtools/dev-overlay/utils/get-error-by-type";
import { time } from "console";
import { usePathname } from "next/navigation";

export default function HeaderPanel(){
    
    const pathname = usePathname();
    const [showHamburgerContents, setShowHamburgerContents] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    function onHamburgerButtonClick(){
        setShowHamburgerContents(!showHamburgerContents);
    }

    function onAboutButtonClick(){
        setShowAbout(!showAbout);
    }

    useEffect(()=>{
        function resizeFunction(){
            const matchSize = window.matchMedia("@media screen and (width <= 700)").matches;
            if(matchSize) setShowAbout(false);
            else setShowHamburgerContents(false);
        }
        window.addEventListener("resize", resizeFunction);
        return () => {
            window.removeEventListener("resize", resizeFunction);
        }
    }, []);

    return(
        <div>
            <header className={styles.header}>
                <div className={styles.logoContainer}>

                </div>
                <div className={styles.linkContainer}>
                    <Link href="/" className={pathname == "/" ? styles.selected : ""}>Confessions</Link>
                    <Link href="/confess" className={pathname == "/confess" ? styles.selected : ""}>Confess</Link>
                    <Link href="/express" className={pathname == "/express" ? styles.selected : ""}>Express</Link>
                    <div className={showAbout ? styles.selected : ""} onClick={onAboutButtonClick}>About {showAbout ? "⮝" : "⮟"}</div>
                </div>
                <div className={styles.hamburgerButton} onClick={onHamburgerButtonClick}/>
            </header>
            
            <div className={styles.hamburgerContainer + (showHamburgerContents ? " "+styles.showContents : "")}>
                <Link href="/">Confessions</Link>
                <Link href="/confess">Confess</Link>
                <Link href="/express">Express</Link>
                <Link href="/about">About</Link>
            </div>
        </div>
    );
}