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
            <div className={styles.hero}>
                <h1 className={styles.title}>
                    Share What Is On Your Mind
                </h1>
                
                <p className={styles.subtitle}>
                    This space exists so that thoughts, worries,
                    experiences, and feelings do not have to be
                    carried alone. Your confession will be posted
                    anonymously.
                </p>
            </div>
                
            <ConfessionForm/>
            <OldConfessionMenu/>
        </div>
    );
}