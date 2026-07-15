'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import styles from "../displayer-style.module.css"

export default function DeleteConfessionButton({confessionId}:{confessionId: string}){
    const router = useRouter();
    async function onClick(){
        const confirmation = confirm("Are you sure you want to delete this confession?");
        if(!confirmation) return;
        const supabase = createClient();
        const {error, data} = await supabase.from("confession").delete().eq("id", confessionId).select();
        if(error){
            alert("Failed to delete confession. Error: "+error.message+". ");
            return;
        }
        alert("The confession has been deleted.");
        router.replace("/");
    }
    return (<button className={styles.deleteButton} onClick={onClick}/>)
}