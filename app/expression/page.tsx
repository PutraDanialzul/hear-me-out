import styles from "../../components/displayer-style.module.css"
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import DeleteExpressionButton from "../../components/expression/delete-expression-button";
import Link from "next/link";
import { getDate } from "../../lib/functions";
import GoBackButton from "../../components/go-back-button";

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
        redirect("/express?error=Expression+not+found!");
        return;
    }
    const expression = select.data as Expression;

    return (<div className={styles.expressionDisplayer}>
        <GoBackButton/>
        <div className={styles.title}>That day I felt...</div>
        <div className={styles.container}>
            <div className={styles.timeContainer}>
                <span className={styles.date}>{getDate(expression.created_at)}</span>
                <span className={styles.time}>{new Date(expression.created_at).toLocaleTimeString()}</span>
            </div>
            <p className={styles.textContainer}>{expression.text}</p>
            <DeleteExpressionButton expressionId={expression.id}/>
            <p className={styles.id}>{expression.id}</p>
        </div>
    </div>);
}