import Link from "next/link";
import ConfessionList from "../components/confession-list";
import styles from "./styles.module.css"
import RemoveLocalStorage from "../components/remove-local-storage";
import { createClient } from "../lib/supabase/server";
import SearchBar from "../components/search-bar";
import SortButton from "../components/sort-button";

export default async function Page({searchParams}:{searchParams:Promise<{error:string|undefined, search:string|undefined, sort:number|undefined, page: number|undefined}>}){
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
    const contentPerPage = 5;
    const oldestFirst = parameter.sort == 1 ? true : false;
    const searchQuery = parameter.search ?? "";
    const selection = await supabase.from("confession").select("created_at, text, id").ilike("text", `%${searchQuery}%`);
    const totalCount = selection.data?.length ?? 0;
    const pageCount = Math.ceil(totalCount/contentPerPage);
    const page = Math.max(0, Math.min(parameter.page ?? 0, pageCount-1));
    const paginationBar = (<div className="paginationBar">
        {page > 0 ? <Link href={`/?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page-1}`}>Previous Page</Link> : null}
        <p>Current page: {page}</p>
        {page < pageCount-1 ? <Link href={`/?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page+1}`}>Next Page</Link> : null}
        <form>
            <input type="hidden" name="search" value={searchQuery}/>
            <input type="hidden" name="sort" value={oldestFirst ? 1 : 0}/>
            <input type="number" name="page" min={0} max={pageCount-1}/>
            <input type="submit" value="Set Page"/>
        </form>
    </div>);
    return (
        <div>
            <RemoveLocalStorage storageKey="confessionDraft"/>
            {banner}
            <h1>Hear Me Out: (Public) {reportLink}</h1>
            <SearchBar sortOldestFirst={oldestFirst}/>
            <p>Current Search: {searchQuery}</p>
            <SortButton searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
            <Link className="addButton" href="/confess">+ Add a confession</Link>
            <ConfessionList sortOldestFirst={oldestFirst} searchQuery={searchQuery} contentPerPage={contentPerPage} page={page}/>
            {paginationBar}
        </div>
    );
}