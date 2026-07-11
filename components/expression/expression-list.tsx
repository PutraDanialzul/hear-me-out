import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "../list-style.module.css"

interface Expression{
    created_at: string,
    text: string,
    id: string
}


export default async function ExpressionList({sortOldestFirst, searchQuery, contentPerPage, page}: {sortOldestFirst: boolean, searchQuery: string, contentPerPage: number, page: number}){


    function getDate(dateString){
        const date = new Date(dateString);
        const day = date.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return "" + day + " " + month + " " + year;
    }

    async function getExpressions():Promise<Expression[]>{
        const supabase = await createClient();
        const selection = await supabase.from("expression").select("created_at, text, id").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst}).range(contentPerPage*(page-1), contentPerPage*(page-1)+contentPerPage-1);
        console.log(new Date(selection.data[0]?.created_at).toLocaleString());
        return selection.data ?? [];
    }
    const expressions = await getExpressions();
    return (
        <div>
            {expressions.map((expression)=>(
                <Link href={"/expression?id="+expression.id} key={expression.id} className={styles.contentBox}>
                    <div className={styles.topArea}>
                        {getDate(expression.created_at)+" | "+new Date(expression.created_at).toLocaleTimeString()}
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