import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "../list-style.module.css"
import { getDate } from "../../lib/functions";
import DateTimeComponent from "../datetime-component";

interface Expression{
    created_at: string,
    text: string,
    id: string
}


export default async function ExpressionList({sortOldestFirst, searchQuery, contentPerPage, page}: {sortOldestFirst: boolean, searchQuery: string, contentPerPage: number, page: number}){

    async function getExpressions():Promise<Expression[]>{
        const supabase = await createClient();
        const selection = await supabase.from("expression").select("created_at, text, id").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst}).range(contentPerPage*(page-1), contentPerPage*(page-1)+contentPerPage-1);
        return selection.data ?? [];
    }
    const expressions = await getExpressions();
    return (
        <div>
            {expressions.map((expression)=>(
                <Link href={"/expression?id="+expression.id} key={expression.id} className={styles.contentBox}>
                    <div className={styles.topArea}>
                        <DateTimeComponent datetime={expression.created_at} showDate/> | <DateTimeComponent datetime={expression.created_at} showTime/>
                    </div>
                    <div className={styles.lowerArea}>
                        <span className={styles.text}>{expression.text}</span>
                        <span className={styles.readMore}>Read More</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}