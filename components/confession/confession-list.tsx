import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "../list-style.module.css"
import { getDate } from "../../lib/functions";

interface Confession{
    created_at: string,
    text: string,
    id: string,
    verified: boolean,
    confessor_id: string
}

export default async function ConfessionList({sortOldestFirst, searchQuery, page=0, contentPerPage}:{sortOldestFirst:boolean, searchQuery: string, page?:number, contentPerPage: number}){
    
    const supabase = await createClient();
    
    async function getConfessions():Promise<Confession[]>{
        const selection = await supabase.from("confession").select("created_at, text, id, verified, confessor_id").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst}).range(contentPerPage*(page-1), contentPerPage*(page-1)+contentPerPage-1);
        return selection.data ?? [];
    }

    const user = await supabase.auth.getUser();
    let userId = "";
    let moderator = false;
    if(user.data.user)
        userId = user.data.user.id;
    const unverifiedMessage = (<span style={{color: "red"}}>(unverified)</span>);
    const yours = (<span style={{color: "magenta"}}>[YOURS]</span>)

    const confessions = await getConfessions();
    return (
        <div>
            {confessions.map((confession)=>(
                <Link href={"/confession?id="+confession.id} key={confession.id} className={styles.contentBox}>
                    <div className={styles.topArea}>
                        {getDate(confession.created_at)+" | "+new Date(confession.created_at).toLocaleTimeString()} {confession.verified ? "" : unverifiedMessage} {userId == confession.confessor_id ? yours : null}
                    </div>
                    <div className={styles.lowerArea}>
                        <span className={styles.text}>{confession.text}</span>
                        <span className={styles.readMore}>Read More</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}