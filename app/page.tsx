import Link from "next/link";
import ConfessionList from "../components/confession-list";
import styles from "./styles.module.css"
import RemoveLocalStorage from "../components/remove-local-storage";

export default async function Page({searchParams}:{searchParams:Promise<{error:string, error_description:string}>}){
    let banner = (null);
    const error = (await searchParams).error;
    const errorDesc = (await searchParams).error_description;
    if(error)
        banner = (
            <div className="errorBanner">
                <p>{"Error: "+error}</p>
            </div>
        );
    return (
        <div>
            <RemoveLocalStorage storageKey="confessionDraft"/>
            {banner}
            <h1>Hear Me Out: (Public)</h1>
            <Link className="addButton" href="/confess">+ Add a confession</Link>
            <ConfessionList/>
        </div>
    );
}