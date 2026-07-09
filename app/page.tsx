import Link from "next/link";
import ConfessionList from "../components/confession-list";
import styles from "./styles.module.css"

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
            {banner}
            <h1>Confessions: </h1><Link className="addButton" href="/confess">+ Add a confession</Link>
            <ConfessionList/>
        </div>
    );
}