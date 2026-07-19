import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import Link from "next/link";
import DeleteReportButton from "../../../components/report/delete-report-button";
import styles from "./style.module.css";
import GoBackButton from "../../../components/go-back-button";

export default async function ReportDataPage({
    searchParams,
}:{
    searchParams: Promise<{id:string}>
}) {

    interface Report{
        id: string;
        created_at: string;
        confession_id: string;
        reporter_id: string;
        reason: string;
    }

    const supabase = await createClient();

    const user = await supabase.auth.getUser();

    if(user.data.user === null){
        redirect(
            `/?error=${encodeURIComponent(
                "Please sign in to gain more access!"
            )}`
        );
    }

    const selectMod = await supabase
        .from("moderator")
        .select("*")
        .single();

    if(selectMod.error){
        redirect(
            `/?error=${encodeURIComponent(
                "Access denied."
            )}`
        );
    }

    const params = await searchParams;

    const selectReport = await supabase
        .from("report")
        .select(
            "id, created_at, confession_id, reporter_id, reason"
        )
        .eq("id", params.id)
        .single();

    if(selectReport.error){
        return (
            <div className={styles.errorCard}>
                Failed to find report.
            </div>
        );
    }

    const report = selectReport.data as Report;

    return (
        <div className={styles.page}>
            <GoBackButton/>
            <div className={styles.hero}>
                <h1 className={styles.title}>
                    Report Review
                </h1>

                <p className={styles.subtitle}>
                    Review submitted information and
                    determine whether moderation action
                    is required.
                </p>
            </div>

            <div className={styles.card}>

                <div className={styles.section}>
                    <h2>Report Information</h2>

                    <p>
                        <strong>Report ID</strong>
                    </p>

                    <div className={styles.codeBox}>
                        {report.id}
                    </div>

                    <p>
                        <strong>Created</strong>
                    </p>

                    <div className={styles.infoBox}>
                        {new Date(
                            report.created_at
                        ).toLocaleString()}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Related Confession</h2>

                    <div className={styles.codeBox}>
                        <Link href={`/confession?id=${report.confession_id}`}>{report.confession_id}</Link>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Reporter</h2>

                    <div className={styles.codeBox}>
                        {report.reporter_id}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Reason</h2>

                    <div className={styles.reasonBox}>
                        {report.reason ||
                            "No reason provided."}
                    </div>
                </div>

                <div className={styles.actionBar}>
                    <DeleteReportButton
                        reportId={report.id}
                    />
                </div>

            </div>
        </div>
    );
}