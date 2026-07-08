import styles from "./list-style.module.css"
import { supabase } from "../lib/supabase";

interface Confession{
    created_at: string,
    text: string,
    id: string
}

async function getConfessions():Promise<Confession[]>{
    const selection = await supabase.from("confession").select("*");
    return selection.data ?? [];
}

export default async function ConfessionList(){
    const confessions = await getConfessions();
    return (
        <table className={styles.border}>
            <thead className={styles.border}>
                <tr className={styles.border}>
                    <th className={styles.border}>Time</th>
                    <th className={styles.border}>Text</th>
                </tr>
            </thead>
            <tbody className={styles.border}>
                {confessions.map((confession)=>(
                    <tr key={confession.id} className={styles.border}>
                        <td className={styles.border+" "+styles.data}>{confession.created_at}</td>
                        <td className={styles.border+" "+styles.data}>{confession.text}</td>
                    </tr>
                ))}
                </tbody>
        </table>
    );
}