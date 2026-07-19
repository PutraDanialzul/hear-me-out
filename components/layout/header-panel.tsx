"use client";

import styles from "./header-style.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import SignOutButton from "./sign-out-button";
import SignInButton from "./sign-in-button";
import logo from "../../app/images/logo.png";
import Image from "next/image";

export default function HeaderPanel(){
    const router = useRouter();
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
            if(user.data.user){
                setUserEmail(user.data.user.email);
            }
            router.refresh();
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
        <div className={styles.mainContainer}>
            <div className={styles.aboutContainer} style={{display: showAbout ? "block" : "none"}}>
                <Link className={styles.aboutLink} href="/about-us">About us</Link>
                <Link className={styles.aboutLink} href="/about">About Hear Me Out</Link>
            </div>

            <header className={styles.header}>
                <div className={styles.topArea}>
                    {loggedIn ? (<div className={styles.logInInformation}>
                        {userEmail}
                    </div>) : 
                    <div className={styles.logInInformation}>
                        {"Not signed in"}
                    </div>}
                    <Link href="/" className={styles.logoContainer}><Image className={styles.logo} alt="Hear Me Out logo" src={logo}/></Link>
                    {loggedIn ? (<div className={styles.buttonContainer}>
                        <SignOutButton/>
                    </div>) : 
                    <div className={styles.buttonContainer}>
                        <SignInButton/>
                    </div>}
                </div>
                <div className={styles.lowerArea}>
                    <div className={styles.linkContainer}>
                        <Link href="/" className={pathname == "/" || pathname == "/confession" ? styles.selected : ""}>Confessions</Link>
                        <Link href="/confess" className={pathname == "/confess" ? styles.selected : ""}>Confess</Link>
                        <Link href="/express" className={pathname == "/express" || pathname == "/express/add" || pathname == "/expression" ? styles.selected : ""}>Express</Link>
                        <button className={showAbout ? styles.selected : ""} onClick={onAboutButtonClick}>About {showAbout ? "▲" : "▼"}</button>
                    </div>
                    <button className={styles.hamburgerButton + (showHamburgerContents ? " "+styles.hamburgerButtonOpen : "")} onClick={onHamburgerButtonClick}/>
                </div>
            </header>
            

            <div className={styles.hamburgerContainer + (showHamburgerContents ? " "+styles.showContents : "")}>
                <Link onClick={()=>{setShowHamburgerContents(false)}} href="/">Confessions</Link>
                <Link onClick={()=>{setShowHamburgerContents(false)}} href="/confess">Confess</Link>
                <Link onClick={()=>{setShowHamburgerContents(false)}} href="/express">Express</Link>
                <Link onClick={()=>{setShowHamburgerContents(false)}} href="/about-us">About us</Link>
                <Link onClick={()=>{setShowHamburgerContents(false)}} href="/about">About Hear Me Out</Link>
            </div>
        </div>
    );
}