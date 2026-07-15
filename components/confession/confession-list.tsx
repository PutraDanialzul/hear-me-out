import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "../list-style.module.css"
import { getDate } from "../../lib/functions";

interface Confession{
    created_at: string,
    text: string,
    id: string,
    verified: boolean
}

export default async function ConfessionList({sortOldestFirst, searchQuery, page=0, contentPerPage}:{sortOldestFirst:boolean, searchQuery: string, page?:number, contentPerPage: number}){

    async function getConfessions():Promise<Confession[]>{
        const supabase = await createClient();
        const selection = await supabase.from("confession").select("created_at, text, id, verified").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst}).range(contentPerPage*(page-1), contentPerPage*(page-1)+contentPerPage-1);
        return selection.data ?? [];
    }

    const confessions = await getConfessions();
    return (
        <div>
            {confessions.map((confession)=>(
                <Link href={"/confession?id="+confession.id} key={confession.id} className={styles.contentBox}>
                    <div className={styles.topArea}>
                        {getDate(confession.created_at)+" | "+new Date(confession.created_at).toLocaleTimeString()}
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