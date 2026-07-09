'use client';

import styles from "./auth-button-style.module.css"
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton(){
    const router = useRouter();
    async function signOut(){
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();
        router.replace("/");
    }
    return <button className={styles.signOutButton} onClick={signOut}>Sign Out</button>
}