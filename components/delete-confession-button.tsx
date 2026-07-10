'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function DeleteConfessionButton({confessionId, disabled}:{confessionId: string, disabled: boolean}){
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
    return (<button disabled={disabled} onClick={onClick}>Delete Confession</button>)
}