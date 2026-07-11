import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import ReportList from "../../components/report/report-list";

export default async function ReportPage(){
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    if(user.data.user === null){
        redirect(`/?error=${encodeURIComponent("Please sign in to gain more access. ")}`);
        return;
    }
    const selectMod = await supabase.from("moderator").select("*").eq("user_id", user.data.user.id).single();
    if(selectMod.error){
        redirect(`/?error=${encodeURIComponent("Access denied. ")}`);
        return;
    }
    return (<div>
        <h1>Reports: </h1>
        <ReportList/>
    </div>);
}