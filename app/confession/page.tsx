import styles from "../../components/displayer-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DeleteConfessionButton from "../../components/delete-confession-button";
import VerifyButton from "../../components/verify-button";

export default async function ConfessionPage({searchParams}:{searchParams:Promise<{id:string}>}){
    interface Confession{
        id: string,
        created_at: string,
        text: string,
        confessor_id: string,
        verified: boolean
    }
    const params = await searchParams;
    const supabase = await createClient();
    const select = await supabase.from("confession").select("*").eq("id", params.id).maybeSingle();
    if(!select.data){
        redirect("/?error=Confession+not+found!");
        return;
    }
    const confession = select.data as Confession;
    let authorized = false;
    let isModerator = false;
    const user = (await supabase.auth.getUser()).data.user;
    if(user){
        const selectMod = await supabase.from("moderator").select("*").eq("user_id", user.id).single();
        if(!selectMod.error) isModerator = true;
        authorized = confession.confessor_id == user.id || isModerator;
    }
    let verifyButton = null;
    if(!confession.verified && isModerator) verifyButton = (<VerifyButton confessionId={confession.id}/>);
    return (<div>
        <h1>Confession Displayer: </h1>
        <p className={styles.textContainer}>{confession.text}</p>
        <div className={styles.metadataContainer}>
            <p>ID: {confession.id}</p>
            <p>Created at: {confession.created_at}</p>
            <p>Verified: {confession.verified ? "true" : "false"}</p>
        </div>
        <DeleteConfessionButton disabled={!authorized} confessionId={confession.id}/>
        {verifyButton}
    </div>);
}