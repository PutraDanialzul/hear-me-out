import styles from "../../components/displayer-style.module.css"
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function ExpressionPage({searchParams}:{searchParams:Promise<{id:string}>}){

    interface Expression{
        id: string,
        created_at: string,
        text: string
    }

    const params = await searchParams;
    const supabase = await createClient();
    const select = await supabase.from("expression").select("id, created_at, text").eq("id", params.id).maybeSingle();
    if(!select.data){
        redirect("/express?error=Confession+not+found!");
        return;
    }
    const expression = select.data as Expression;

    return (<div>
        <h1>Confession Displayer: </h1>
        <p className={styles.textContainer}>{expression.text}</p>
        <div className={styles.metadataContainer}>
            <p>ID: {expression.id}</p>
            <p>Created at: {expression.created_at}</p>
        </div>
    </div>);
}