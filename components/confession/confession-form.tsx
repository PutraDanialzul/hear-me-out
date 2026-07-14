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
        <form className={styles.form} action={addConfession}>
            <DraftTextarea name="text" placeholder="What's on your mind? " storageKey="confessionDraft"/>
            <input className={styles.sendButton} type="submit" value={"Publish"}/>
        </form>
    );
}