import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "./report-list-style.module.css";
import DateTimeComponent from "../datetime-component";

interface Report{
    created_at: string;
    reason: string;
    id: string;
}

export default async function ReportList(){

    const supabase = await createClient();

    const reports =
        (
            await supabase
                .from("report")
                .select("created_at, reason, id")
                .order("created_at", {
                    ascending: false
                })
        ).data ?? [];

    if(reports.length === 0){
        return (
            <div className={styles.empty}>
                No reports currently require review.
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {reports.map((report) => (
                <Link key={report.id} className={styles.card} href={`/reports/data?id=${report.id}`}>
                    <div className={styles.header}>
                        Report Submitted
                    </div>

                    <div className={styles.date}>
                        <DateTimeComponent datetime={report.created_at} showDate showTime/>
                    </div>

                    <div className={styles.reason}>
                        {report.reason || "No reason provided."}
                    </div>

                    <div className={styles.review}>
                        Review Report →
                    </div>
                </Link>
            ))}
        </div>
    );
}