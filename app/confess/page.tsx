import styles from "./style.module.css"
import ConfessionForm from "../../components/confession/confession-form";
import OldConfessionMenu from "../../components/confession/old-confession-menu";

export default async function ConfessPage({searchParams}:{searchParams:Promise<{error:string}>}){

    let banner = (null);
    const error = (await searchParams).error;
    if(error)
        banner = (
            <div className="errorBanner">
                {error}
            </div>
        );
    return (
        <div className={styles.mainPage}>
            {banner} 
            <h1 className={styles.title}>Confess</h1>
            <ConfessionForm/>
            <OldConfessionMenu/>
        </div>
    );
}