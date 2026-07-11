'use client';

export default function SearchBar({sortOldestFirst}:{sortOldestFirst: boolean}){
    return (<form>
        <input type="hidden" name="sort" value={sortOldestFirst ? 1 : 0}/>
        <input type="text" name="search"/>
        <input type="submit" value="Search"/>
    </form>)
}