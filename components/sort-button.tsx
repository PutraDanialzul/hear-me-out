
export default function SortButton({searchQuery, sortOldestFirst}:{searchQuery:string, sortOldestFirst:boolean}){
    return (<form>
        <input type="hidden" name="search" value={searchQuery}/>
        <input type="hidden" name="sort" value={sortOldestFirst ? 0 : 1}/>
        <input type="submit" value={sortOldestFirst ? "Sort: Oldest" : "Sort: Newest"}/>
    </form>)
}