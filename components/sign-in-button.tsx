'use client';

import styles from "./auth-button-style.module.css"
import { Provider } from "@supabase/supabase-js";
import { createClient } from "../lib/supabase/client";

export default function SignInButton(){
    async function signIn(){
        const supabase = await createClient();
        const provider = 'azure' as Provider
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `/auth/callback`,
                scopes: "email",
                queryParams: {
                    prompt: "select_account",
                }
            },
        });
    }

    return (<button className={styles.signInButton} onClick={signIn}>Sign In</button>);
}