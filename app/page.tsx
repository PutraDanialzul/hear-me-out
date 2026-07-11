import Link from "next/link";
import ConfessionList from "../components/confession-list";
import styles from "./styles.module.css"
import RemoveLocalStorage from "../components/remove-local-storage";
import { createClient } from "../lib/supabase/server";
import SearchBar from "../components/search-bar";
import SortButton from "../components/sort-button";

export default async function Page({searchParams}:{searchParams:Promise<{error:string, search:string, sort:number}>}){
    let banner = null;
    let reportLink = null;
    const parameter = await searchParams;
    const error = parameter.error;
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
    const oldestFirst = parameter.sort == 1 ? true : false;
    const searchQuery = parameter.search ?? "";
    return (
        <div>
            <RemoveLocalStorage storageKey="confessionDraft"/>
            {banner}
            <h1>Hear Me Out: (Public) {reportLink}</h1>
            <SearchBar sortOldestFirst={oldestFirst}/>
            <p>Current Search: {searchQuery}</p>
            <SortButton searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
            <Link className="addButton" href="/confess">+ Add a confession</Link>
            <ConfessionList sortOldestFirst={oldestFirst} searchQuery={searchQuery}/>
        </div>
    );
}