import styles from "./form-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default function ExpressionForm(){

    async function addExpression(formData: FormData){
        'use server';
        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        if(!user.data.user){
            redirect("/?error=Please+sign+in+to+gain+more+access!");
            return;
        }
        const userId = user.data.user.id;
        const textData = formData.get("text") as string;
        const insert = await supabase.from("expression").insert({text:textData, owner_id:userId});
        if(insert.error){
            redirect(`/express/add?error=${encodeURIComponent("Error: "+insert.error.message+". ")}`);
        }
        else redirect("/express");
    }

    return (
        <div className={styles.container}>
            <form action={addExpression}>
                <fieldset className={styles.form}>
                    <legend>Express yourself</legend>
                    <label className={styles.label} htmlFor="expression">Please write your expression: (Only you can read it)</label>
                    <textarea className={styles.textArea} id="expression" name="text"/>
                    <input className={styles.sendButton} type="submit" value={"Express"}/>
                </fieldset>
            </form>
        </div>
    );
}