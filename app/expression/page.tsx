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
        <div className={styles.title}>A Moment Worth Remembering</div>
        <p
            style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                marginTop: "-0.75rem",
                marginBottom: "2rem",
                lineHeight: "1.8"
            }}
        >
            This entry only belongs to you.
        </p>
        <div className={styles.container}>
            <div className={styles.timeContainer}>
                <span className={styles.date}>{getDate(expression.created_at)}</span>
                <span className={styles.time}>{new Date(expression.created_at).toLocaleTimeString()}</span>
            </div>
            <div className={styles.textContainer}>{expression.text}</div>
            <div className={styles.actionBar}>
                <DeleteExpressionButton expressionId={expression.id}/>
            </div>
            <p className={styles.id}>{expression.id}</p>
        </div>
    </div>);
}