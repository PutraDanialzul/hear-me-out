import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import styles from "./list-style.module.css"

interface Confession{
    created_at: string,
    text: string,
    id: string,
    verified: boolean
}

export default async function ConfessionList({sortOldestFirst, searchQuery}:{sortOldestFirst:boolean, searchQuery: string}){

    async function getConfessions():Promise<Confession[]>{
        const supabase = await createClient();
        const selection = await supabase.from("confession").select("created_at, text, id, verified").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst});
        return selection.data ?? [];
    }

    const confessions = await getConfessions();
    return (
        <div>
            {confessions.map((confession)=>(
                <Link href={"/confession?id="+confession.id} key={confession.id} className={confession.verified ? styles.contentBox : styles.unverifiedBox}>
                    <p>Time Created: {confession.created_at} {!confession.verified ? "(unverified)" : ""}</p>
                    <p>{confession.text}</p>
                </Link>
            ))}
        </div>
    );
}