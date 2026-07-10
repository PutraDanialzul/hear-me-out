import Link from "next/link";
import { createClient } from "../lib/supabase/server";
import styles from "./list-style.module.css"

interface Expression{
    created_at: string,
    text: string,
    id: string
}


export default async function ExpressionList(){


    async function getExpressions():Promise<Expression[]>{
        const supabase = await createClient();
        const selection = await supabase.from("expression").select("created_at, text, id").order("created_at", {ascending: false});
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