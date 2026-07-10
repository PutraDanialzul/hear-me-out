'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function DeleteExpressionButton({expressionId}:{expressionId: string}){
    const router = useRouter();
    async function onClick(){
        const confirmation = confirm("Are you sure you want to delete this expression?");
        if(!confirmation) return;
        const supabase = createClient();
        const {error, data} = await supabase.from("expression").delete().eq("id", expressionId).select();
        if(error){
            alert("Failed to delete expression. Error: "+error.message+". ");
            return;
        }
        alert("The expression has been deleted.");
        router.replace("/express");
    }
    return (<button onClick={onClick}>Delete Expression</button>)
}