'use client';

import { createClient } from "../lib/supabase/client";

export default function ReportButton({confessionId}:{confessionId:string}){
    
    async function reportConfession(){
        const result = prompt("Please state your reasons to report this confession: (optional)");
        if(result === null) return;
        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        if(user.data.user === null){
            alert("Please sign in to gain more access. ");
            return;
        }
        const rpcResult = await supabase.rpc("can_report");
        if(!(rpcResult.data as boolean)){
            alert("Please wait for 1 minute for each reports. ");
        }
        else{
            const insert = await supabase.from("report").insert({confession_id: confessionId, reporter_id: user.data.user.id, reason: result});
            if(insert.error) alert("Error: "+insert.error.message+". ");
            else alert("Confession has been reported. ");
        }
    }

    return <button onClick={reportConfession}>Report Confession</button>
}