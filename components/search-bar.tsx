'use client';

import styles from "./search-bar-style.module.css"

export default function SearchBar({sortOldestFirst, className}:{sortOldestFirst: boolean, className?:string}){
    return (<form className={styles.searchBar+" "+className}>
        <input type="hidden" name="sort" value={sortOldestFirst ? 1 : 0}/>
        <input className={styles.textInput} type="text" name="search" placeholder="search"/>
    </form>)
}