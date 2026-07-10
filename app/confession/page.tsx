import styles from "../../components/displayer-style.module.css"
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function ConfessionPage({searchParams}:{searchParams:Promise<{id:string}>}){

    interface Confession{
        id: string,
        created_at: string,
        text: string
    }

    const params = await searchParams;
    const supabase = await createClient();
    const select = await supabase.from("confession").select("id, created_at, text").eq("id", params.id).maybeSingle();
    if(!select.data){
        redirect("/?error=Confession+not+found!");
        return;
    }
    const confession = select.data as Confession;

    return (<div>
        <h1>Confession Displayer: </h1>
        <p className={styles.textContainer}>{confession.text}</p>
        <div className={styles.metadataContainer}>
            <p>ID: {confession.id}</p>
            <p>Created at: {confession.created_at}</p>
        </div>
    </div>);
}