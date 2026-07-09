import styles from "./form-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default function ConfessionForm(){

    async function addConfession(formData: FormData){
        'use server';
        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        if(!user.data.user){
            redirect("/?error=Please+sign+in+to+gain+more+access!")
            return;
        }
        const userId = user.data.user.id;
        const textData = formData.get("text") as string;
        const insert = await supabase.from("confession").insert({text:textData, confessor_id:userId});
        if(insert.error){
            redirect(`/confess?error=${encodeURIComponent("Error: "+insert.error.message+". ")}`);
        }
        else redirect("/");
    }

    return (
        <div className={styles.container}>
            <form action={addConfession}>
                <fieldset className={styles.form}>
                    <legend>Hear Me Out</legend>
                    <label className={styles.label} htmlFor="confession">Please write your confession: </label>
                    <textarea className={styles.textArea} id="confession" name="text"/>
                    <input className={styles.sendButton} type="submit" value={"Confess"}/>
                </fieldset>
            </form>
        </div>
    );
}