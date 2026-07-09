import styles from "./style.module.css"
import ConfessionForm from "../../components/confession-form";

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
        <div>
            {banner} 
            <ConfessionForm/>
        </div>
    );
}