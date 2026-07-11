import Link from "next/link";
import ExpressionList from "../../components/expression-list";
import RemoveLocalStorage from "../../components/remove-local-storage";
import SearchBar from "../../components/search-bar";
import SortButton from "../../components/sort-button";

export default async function ExpressPage({searchParams}:{searchParams:Promise<{error:string, sort: number|undefined, search: string|undefined}>}){
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
    return (<div>
        <RemoveLocalStorage storageKey="expressionDraft"/>
        <h1>Expressions: (Private)</h1>
        <SearchBar sortOldestFirst={oldestFirst}/>
        <p>Current search: {searchQuery}</p>
        <SortButton searchQuery={searchQuery} sortOldestFirst={oldestFirst}/>
        <Link className="addButton" href="/express/add">+ Add an expression</Link>
        <ExpressionList sortOldestFirst={oldestFirst} searchQuery={searchQuery}/>
    </div>);
}