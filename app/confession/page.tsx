import styles from "../../components/displayer-style.module.css";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DeleteConfessionButton from "../../components/confession/delete-confession-button";
import VerifyButton from "../../components/confession/verify-button";
import ReportButton from "../../components/confession/report-button";
import UnverifyButton from "../../components/confession/unverify-button";
import Link from "next/link";
import { getDate } from "../../lib/functions";
import GoBackButton from "../../components/go-back-button";

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
    const user = await supabase.auth.getUser();
    let userId = "";
    let moderator = false;
    if(user.data.user){
        userId = user.data.user.id;
        const selectMod = await supabase.from("moderator").select("user_id").eq("user_id", userId).single();
        if(!selectMod.error) moderator = true;
    }
    const select = await supabase.from("confession").select("id, created_at, text, confessor_id, verified").eq("id", params.id).maybeSingle();
    if(!select.data){
        redirect("/?error=Confession+not+found!");
        return;
    }
    const confession = select.data as Confession;
    const unverified = (<span style={{color:"red"}}>(unverified)</span>);

    return (<div className={styles.confessionDisplayer}>
        <GoBackButton/>
        <div className={styles.title}>{confession.confessor_id == userId ? "Your Confession" : "Hear Me Out"} {!confession.verified ? unverified : null}</div>
        <div className={styles.container}>
            <div className={styles.timeContainer}>
                <span className={styles.date}>{getDate(confession.created_at)}</span>
                <span className={styles.time}>{new Date(confession.created_at).toLocaleTimeString()}</span>
            </div>
            <p className={styles.textContainer}>{confession.text}</p>
            {userId ? (confession.confessor_id == userId ? null : <ReportButton confessionId={confession.id}/>) : null}
            {userId ? (confession.confessor_id == userId || moderator ? <DeleteConfessionButton confessionId={confession.id}/> : null) : null}
            {moderator ? (confession.verified ? <UnverifyButton confessionId={confession.id}/> : <VerifyButton confessionId={confession.id}/>) : null}
            <p className={styles.id}>{confession.id}</p>
        </div>
    </div>);
}