import Link from "next/link";
import ConfessionList from "../components/confession-list";
import styles from "./styles.module.css"
import RemoveLocalStorage from "../components/remove-local-storage";
import { createClient } from "../lib/supabase/server";

export default async function Page({searchParams}:{searchParams:Promise<{error:string, error_description:string}>}){
    let banner = null;
    let reportLink = null;
    const error = (await searchParams).error;
    const errorDesc = (await searchParams).error_description;
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    if(user.data.user){
        const selectMod = await supabase.from("moderator").select("*").single();
        if(!selectMod.error){
            const reportSelect = await supabase.from("report").select("*");
            reportLink = (<Link href="/reports">View reports ({reportSelect.data.length})</Link>);
        }
    }
    if(error)
        banner = (
            <div className="errorBanner">
                <p>{"Error: "+error}</p>
            </div>
        );
    return (
        <div>
            <RemoveLocalStorage storageKey="confessionDraft"/>
            {banner}
            <h1>Hear Me Out: (Public) {reportLink}</h1>
            <Link className="addButton" href="/confess">+ Add a confession</Link>
            <ConfessionList/>
        </div>
    );
}