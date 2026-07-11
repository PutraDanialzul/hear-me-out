import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import styles from "../list-style.module.css"

interface Expression{
    created_at: string,
    text: string,
    id: string
}


export default async function ExpressionList({sortOldestFirst, searchQuery, contentPerPage, page}: {sortOldestFirst: boolean, searchQuery: string, contentPerPage: number, page: number}){


    async function getExpressions():Promise<Expression[]>{
        const supabase = await createClient();
        const selection = await supabase.from("expression").select("created_at, text, id").ilike("text", `%${searchQuery}%`).order("created_at", {ascending: sortOldestFirst}).range(contentPerPage*page, contentPerPage*(page)+contentPerPage-1);
        return selection.data ?? [];
    }

    const expressions = await getExpressions();
    return (
        <div>
            {expressions.map((expression)=>(
                <Link href={"/expression?id="+expression.id} key={expression.id} className={styles.contentBox}>
                    <p>Time Created: {expression.created_at}</p>
                    <p>{expression.text}</p>
                </Link>
            ))}
        </div>
    );
}