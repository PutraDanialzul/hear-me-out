import styles from "../form-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DraftTextarea from "../draft-textarea";

export default function ConfessionForm(){

    async function addConfession(formData: FormData){
        'use server';
        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        if(!user.data.user){
            redirect("/?error=Please+sign+in+to+gain+more+access!")
            return;
        }
        const rpcData = await supabase.rpc("can_insert_confession");
        if(rpcData.error){
            redirect(`/confess?error=${encodeURIComponent("Error: "+rpcData.error.message+". ")}`);
            return;
        }
        else if(!(rpcData.data as boolean)){
            redirect(`/confess?error=${encodeURIComponent("Error: Please wait for another 1 minute after submitting a confession. ")}`);
            return;
        }
        const userId = user.data.user.id;
        const textData = (formData.get("text") as string).substring(0, 1500);
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
                    <label className={styles.label} htmlFor="textarea">Please write your confession: </label>
                    <DraftTextarea name="text" storageKey="confessionDraft"/>
                    <input className={styles.sendButton} type="submit" value={"Confess"}/>
                </fieldset>
            </form>
        </div>
    );
}