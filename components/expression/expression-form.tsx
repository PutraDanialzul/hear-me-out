import styles from "../form-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DraftTextarea from "../draft-textarea";

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
        const textData = (formData.get("text") as string).substring(0, 1500);
        const rpcData = await supabase.rpc("can_insert_expression");
        if(rpcData.error){
            redirect(`/express/add?error=${encodeURIComponent("Error: "+rpcData.error.message+". ")}`);
            return;
        }
        else if(!(rpcData.data as boolean)){
            redirect(`/express/add?error=${encodeURIComponent("Please wait for 1 minute after submitting an expression. ")}`);
            return;
        }
        const insert = await supabase.from("expression").insert({text:textData, owner_id:userId});
        if(insert.error){
            redirect(`/express/add?error=${encodeURIComponent("Error: "+insert.error.message+". ")}`);
        }
        else{ 
            redirect("/express");
        }
    }

    return (
        <form className={styles.form} action={addExpression}>
            <DraftTextarea name="text" placeholder="What's on your mind? " storageKey="expressionDraft"/>
            <input className={styles.sendButton} type="submit" value={"Save"}/>
        </form>
    );
}