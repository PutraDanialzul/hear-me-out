'use client';

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import styles from "./report-action-style.module.css";

export default function DeleteReportButton({
    reportId
}:{
    reportId:string
}){

    const router = useRouter();

    async function deleteReport(){

        const confirmation = confirm(
            "Are you sure you want to delete this report?"
        );

        if(!confirmation) return;

        const supabase = createClient();

        const result = await supabase
            .from("report")
            .delete()
            .eq("id", reportId)
            .select();

        if(result.error){
            alert(
                "Failed to delete report. Error: " +
                result.error.message
            );
            return;
        }

        alert("Report deleted.");

        router.replace("/reports");
    }

    return (
        <button
            className={styles.deleteButton}
            onClick={deleteReport}
        >
            Delete Report
        </button>
    );
}