'use client';

import styles from "./auth-button-style.module.css"
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function SignOutButton(){
    async function signOut(){
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();
        redirect("/");
    }
    return <button className={styles.signOutButton} onClick={signOut}>Sign Out</button>
}