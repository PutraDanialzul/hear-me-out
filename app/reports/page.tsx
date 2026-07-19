import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import ReportList from "../../components/report/report-list";
import styles from "./style.module.css";

export default async function ReportPage(){

    const supabase = await createClient();

    const user = await supabase.auth.getUser();

    if(user.data.user === null){
        redirect(
            `/?error=${encodeURIComponent(
                "Please sign in to gain more access."
            )}`
        );
    }

    const selectMod = await supabase
        .from("moderator")
        .select("*")
        .eq("user_id", user.data.user.id)
        .single();

    if(selectMod.error){
        redirect(
            `/?error=${encodeURIComponent(
                "Access denied."
            )}`
        );
    }

    const reportCount =
        (
            await supabase
                .from("report")
                .select("id")
        ).data?.length ?? 0;

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <h1 className={styles.title}>
                    Moderation Queue
                </h1>

                <p className={styles.subtitle}>
                    Review reports submitted by users and
                    help keep Hear Me Out safe and respectful.
                </p>

                <div className={styles.countCard}>
                    {reportCount} Pending Reports
                </div>
            </div>

            <div className={styles.content}>
                <ReportList/>
            </div>
        </div>
    );
}