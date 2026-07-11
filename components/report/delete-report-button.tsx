'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function DeleteReportButton({reportId}: {reportId:string}){
    const router = useRouter();
    async function deleteReport(){
        const confirmation = confirm("Are you sure you want to delete this report? ");
        if(!confirmation) return;
        const supabase = createClient();
        const deleteReport = await supabase.from("report").delete().eq("id", reportId).select();
        if(deleteReport.error){
            alert("Failed to delete report. Error: "+deleteReport.error.message+". ");
            return;
        }
        alert("The report has been deleted. ")
        router.replace("/reports");
        
    }
    return (<button onClick={deleteReport}>Delete Report</button>)
}