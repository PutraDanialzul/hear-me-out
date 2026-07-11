import styles from "./style.module.css"
import Link from "next/link";
import ExpressionList from "../../components/expression/expression-list";
import RemoveLocalStorage from "../../components/remove-local-storage";
import SearchBar from "../../components/search-bar";
import SortButton from "../../components/sort-button";
import { createClient } from "../../lib/supabase/server";
import Image from "next/image";
import mindSpaceIcon from "./mind-space.png";
import thoughtIcon from "./thought-icon.png";

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
    const searchQuery = parameter.search ?? "";
    const contentPerPage = 10;
    const supabase = await createClient();
    const selection = await supabase.from("expression").select("created_at, text, id").ilike("text", `%${searchQuery}%`);
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
    return (<div className={styles.panel}>
        <div className={styles.leftSide}>
            <div className={styles.iconContainer}>
                <Image src={mindSpaceIcon} alt="mind space icon" className={styles.mindSpaceIcon}/>
                <div className={styles.mindSpaceInfo}>
                    <p style={{fontWeight: "bold", margin: "auto 0 0 0"}}>mind space</p>
                    <p style={{margin: "0 0 auto 0"}}>a space for you</p>
                </div>
            </div>
            <div className={styles.linkGroup}>
                <Link className={styles.linkContainer} href="/express">
                    <Image className={styles.linkIcon} src={thoughtIcon} alt="thought icon"/>
                    <p>My Thoughts</p>
                </Link>
                <Link className={styles.linkContainer} href="/express/add">New Entry</Link>
                <Link className={styles.linkContainer} href="/express/mood-tracker">Mood Tracker</Link>
            </div>
        </div>
        <div className={styles.rightSide}>
            <RemoveLocalStorage storageKey="expressionDraft"/>
            <h1>Expressions: (Private)</h1>
            <SearchBar sortOldestFirst={oldestFirst}/>
            <p>Current search: {searchQuery}</p>
            <SortButton searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
            <Link className="addButton" href="/express/add">+ Add an expression</Link>
            <ExpressionList sortOldestFirst={oldestFirst} searchQuery={searchQuery} page={page} contentPerPage={contentPerPage}/>
            {paginationBar}
        </div>
    </div>);
}