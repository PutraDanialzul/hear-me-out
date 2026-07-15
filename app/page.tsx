import Link from "next/link";
import ConfessionList from "../components/confession/confession-list";
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
    const page = Math.max(1, Math.min(parameter.page ?? 1, pageCount));
    const paginationBar = (<div className={styles.paginationBar}>
        {page > 1 ? <Link className={styles.prevButton} href={`/?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page-1}`}/> : null}
        <form>
            <input type="hidden" name="search" value={searchQuery}/>
            <input type="hidden" name="sort" value={oldestFirst ? 1 : 0}/>
            <input type="number" name="page" defaultValue={page} min={1} max={pageCount}/>
        </form>
        {page < pageCount ? <Link className={styles.nextButton} href={`/?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page+1}`}/> : null}
    </div>);
    const resetPage = searchQuery ? (<Link href={`/?sort=${oldestFirst ? 1 : 0}`}>reset</Link>) : null;
    return (
        <div className={styles.pageContent}>
            <RemoveLocalStorage storageKey="confessionDraft"/>
            {banner}
            <div className={styles.top}>
                <h1 className={styles.title}>Confessions</h1> {reportLink}
            </div>
            <div className={styles.bottom}>
                <div className={styles.navigationBar}>
                    <SearchBar className={styles.search} sortOldestFirst={oldestFirst}/>
                    <SortButton className={styles.sort} searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
                </div>
                <p>Current Search: {searchQuery} {resetPage}</p>
                <p className={styles.pageInfo}>Page {page} of {pageCount}</p>
                <ConfessionList sortOldestFirst={oldestFirst} searchQuery={searchQuery} contentPerPage={contentPerPage} page={page}/>
                {paginationBar}
            </div>
        </div>
    );
}