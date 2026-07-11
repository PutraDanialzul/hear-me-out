import styles from "./sort-button-style.module.css"


export default function SortButton({searchQuery, sortOldestFirst, className}:{searchQuery:string, sortOldestFirst:boolean, className?:string}){
    return (<form className={className}>
        <input type="hidden" name="search" value={searchQuery}/>
        <input type="hidden" name="sort" value={sortOldestFirst ? 0 : 1}/>
        <button className={styles.sortButton+" "+(sortOldestFirst ? styles.oldestFirst : styles.newestFirst)} type="submit"/>
    </form>)
}