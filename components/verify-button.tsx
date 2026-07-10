'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function VerifyButton({confessionId}:{confessionId:string}){
    
    const router = useRouter();
    
    async function verifyConfession(){
        const supabase = createClient();
        const confirmation = confirm("Do you really want to verify this confession? ");
        if(!confirmation) return;
        const update = await supabase.from("confession").update({"verified": true}).eq("id", confessionId);
        if(update.error){
            alert("Failed to verify confession. Error: "+update.error.message+". ");
            return;
        }
        alert("You have successfully verified the confession. ");
        router.replace("/");
    }

    return (<button onClick={verifyConfession}>Verify Confession</button>);
}