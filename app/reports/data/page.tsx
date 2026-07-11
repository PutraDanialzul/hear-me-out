import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import Link from "next/link";
import DeleteReportButton from "../../../components/report/delete-report-button";

export default async function ReportDataPage({searchParams}:{searchParams:Promise<{id:string}>}){
    interface Report{
        id: string,
        created_at: string,
        confession_id: string,
        reporter_id: string,
        reason: string
    };
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    if(user.data.user === null){
        redirect(`/?error: ${encodeURIComponent("Please sign in to gain more access! ")}`);
        return;
    }
    const selectMod = await supabase.from("moderator").select("*").single();
    if(selectMod.error){
        redirect(`/?error: ${encodeURIComponent("Access denied. ")}`);
        return;
    }
    const parameter = await searchParams;
    const selectReport = await supabase.from("report").select("id, created_at, confession_id, reporter_id, reason").eq("id", parameter.id).single();
    if(selectReport.error) return (<div>Failed to find the report. Error: {selectReport.error.message}. </div>);
    const report:Report = selectReport.data;
    return (<div>
        <h1>Report data: </h1>
        <p>ID: {report.id}</p>
        <p>Created at: {report.created_at}</p>
        <p>Reporter ID: {report.reporter_id}</p>
        <p>Confession ID: <Link href={"/confession?id="+report.confession_id}>{report.confession_id}</Link></p>
        <p style={{whiteSpace: "pre-line"}}>Reason: {report.reason}</p>
        <DeleteReportButton reportId={report.id}/>
    </div>);
}