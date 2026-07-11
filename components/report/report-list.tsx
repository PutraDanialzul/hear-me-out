import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "./list-style.module.css"

interface Report{
    created_at: string,
    reason: string,
    id: string
}


export default async function ReportList(){


    async function getReports():Promise<Report[]>{
        const supabase = await createClient();
        const selection = await supabase.from("report").select("created_at, reason, id").order("created_at", {ascending: false});
        return selection.data ?? [];
    }

    const reports = await getReports();
    return (
        <div>
            {reports.map((report)=>(
                <Link href={"/reports/data?id="+report.id} key={report.id} className={styles.contentBox}>
                    <p>Time Created: {report.created_at}</p>
                    <p>Reason: {report.reason}</p>
                </Link>
            ))}
        </div>
    );
}