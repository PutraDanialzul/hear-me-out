import styles from "./style.module.css"
import Link from "next/link";
import ExpressionList from "../../components/expression/expression-list";
import RemoveLocalStorage from "../../components/remove-local-storage";
import SearchBar from "../../components/search-bar";
import SortButton from "../../components/sort-button";
import { createClient } from "../../lib/supabase/server";
import MindSpacePanel from "../../components/expression/mind-space-panel";

export default async function ExpressPage({searchParams}:{searchParams:Promise<{error:string, sort: number|undefined, search: string|undefined, page: number|undefined}>}){
    let banner = (null);
    const parameter = await searchParams;
    const error = parameter.error;
    if(error)
        banner = (
            <div className="errorBanner">
                <p>{"Error: "+error}</p>
            </div>
        );
    const oldestFirst = parameter.sort == 1 ? true : false;
    const searchQuery = parameter.search?.trim() ?? "";
    const contentPerPage = 5;
    const supabase = await createClient();
    const selection = await supabase.from("expression").select("created_at, text, id").ilike("text", `%${searchQuery}%`);
    const totalCount = selection.data?.length ?? 0;
    const pageCount = Math.ceil(totalCount/contentPerPage);
    const page = Math.max(1, Math.min(parameter.page ?? 1, pageCount));
    const paginationBar = (<div className={styles.paginationBar}>
        {page > 1 ? <Link className={styles.prevButton} href={`/express?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page-1}`}/> : null}
        {page}
        {page < pageCount ? <Link className={styles.nextButton} href={`/express?search=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(oldestFirst ? 1 : 0)}&page=${page+1}`}/> : null}
    </div>);
    return (<MindSpacePanel>
        <RemoveLocalStorage storageKey="expressionDraft"/>
        <h1>My Thoughts</h1>
        <div className={styles.displaySetting}>
            <SearchBar className={styles.searchBar} sortOldestFirst={oldestFirst}/>
            <SortButton className={styles.sortButton} searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
        </div>
        <p style={{fontFamily: "sans-serif"}}>Current search: {searchQuery} {searchQuery ? (<Link href={`/express?sort=${parameter.sort}`}>Reset</Link>) : null}</p>
        <p className={styles.pageInfo}>Page {page} of {pageCount}</p>
        <ExpressionList sortOldestFirst={oldestFirst} searchQuery={searchQuery} page={page} contentPerPage={contentPerPage}/>
        {paginationBar}
    </MindSpacePanel>);
}