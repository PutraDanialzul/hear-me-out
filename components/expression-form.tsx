import styles from "./form-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import DraftTextarea from "./draft-textarea";

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
        <div className={styles.container}>
            <form action={addExpression}>
                <fieldset className={styles.form}>
                    <legend>Express yourself</legend>
                    <label className={styles.label} htmlFor="textarea">Please write your expression: (Only you can read it)</label>
                    <DraftTextarea name="text" storageKey="expressionDraft"/>
                    <input className={styles.sendButton} type="submit" value={"Express"}/>
                </fieldset>
            </form>
        </div>
    );
}