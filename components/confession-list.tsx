import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import styles from "./list-style.module.css"

interface Confession{
    created_at: string,
    text: string,
    id: string
}


export default async function ConfessionList(){


    async function getConfessions():Promise<Confession[]>{
        const supabase = await createClient();
        const selection = await supabase.from("confession").select("*");
        return selection.data ?? [];
    }

    const confessions = await getConfessions();
    return (
        <div>
            {confessions.map((confession)=>(
                <Link href={"/confession?id="+confession.id} key={confession.id} className={styles.confessionBox}>
                    <p>Time Created: {confession.created_at}</p>
                    <p>{confession.text}</p>
                </Link>
            ))}
        </div>
    );
}