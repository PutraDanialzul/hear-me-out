"use client";

import styles from "./header-style.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import SignOutButton from "../sign-out-button";
import SignInButton from "../sign-in-button";

export default function HeaderPanel(){
    
    const pathname = usePathname();
    const [showHamburgerContents, setShowHamburgerContents] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    function onHamburgerButtonClick(){
        setShowHamburgerContents(prev => !prev);
    }

    function onAboutButtonClick(){
        setShowAbout(prev => !prev);
    }

    useEffect(()=>{
        const supabase = createClient();
        async function checkUser(){
            const user = await supabase.auth.getUser();
            setLoggedIn(user.data.user != null);
            if(user.data.user)
                setUserEmail(user.data.user.email);
        }
        checkUser();
        const {data:{subscription}} = supabase.auth.onAuthStateChange((event, session)=>{
            checkUser();
        });
        const matchSize = window.matchMedia("screen and (max-width: 700px)");
        function resizeFunction(){
            if(matchSize.matches) setShowAbout(false);
            else setShowHamburgerContents(false);
        }
        resizeFunction();
        window.addEventListener("resize", resizeFunction);
        return () => {
            subscription.unsubscribe();
            window.removeEventListener("resize", resizeFunction);
        }
    }, []);

    useEffect(()=>{
        setShowAbout(false);
        setShowHamburgerContents(false);
    }, [pathname]);

    return(
        <div>
            <div className={styles.aboutContainer} style={{display: showAbout ? "block" : "none"}}>
                <Link className={styles.aboutLink} href="/about-us">About us</Link>
                <Link className={styles.aboutLink} href="/about">About Hear Me Out</Link>
            </div>

            <header className={styles.header}>
            
                <div className={styles.logoContainer}>

                </div>
                {loggedIn ? (<div className={styles.logInInformation}>
                    {userEmail}
                    <SignOutButton/>
                </div>) : 
                <div className={styles.logInInformation}>
                    <SignInButton/>
                </div>}
                <div className={styles.linkContainer}>
                    <Link href="/" className={pathname == "/" ? styles.selected : ""}>Confessions</Link>
                    <Link href="/confess" className={pathname == "/confess" ? styles.selected : ""}>Confess</Link>
                    <Link href="/express" className={pathname == "/express" ? styles.selected : ""}>Express</Link>
                    <button className={showAbout ? styles.selected : ""} onClick={onAboutButtonClick}>About {showAbout ? "⮝" : "⮟"}</button>
                </div>
                <button className={styles.hamburgerButton + (showHamburgerContents ? " "+styles.hamburgerButtonOpen : "")} onClick={onHamburgerButtonClick}/>
            </header>
            

            <div className={styles.hamburgerContainer + (showHamburgerContents ? " "+styles.showContents : "")}>
                <Link href="/">Confessions</Link>
                <Link href="/confess">Confess</Link>
                <Link href="/express">Express</Link>
                <Link href="/about-us">About us</Link>
                <Link href="/about">About Hear Me Out</Link>
            </div>
        </div>
    );
}