'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function UnverifyButton({confessionId}:{confessionId:string}){
    
    const router = useRouter();
    
    async function verifyConfession(){
        const supabase = createClient();
        const confirmation = confirm("Do you really want to unverify this confession? ");
        if(!confirmation) return;
        const update = await supabase.from("confession").update({"verified": false}).eq("id", confessionId);
        if(update.error){
            alert("Failed to unverify confession. Error: "+update.error.message+". ");
            return;
        }
        alert("You have successfully unverified the confession. ");
        router.refresh();
    }

    return (<button onClick={verifyConfession}>Unverify Confession</button>);
}