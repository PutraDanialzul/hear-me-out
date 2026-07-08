import { redirect } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function ConfessionForm(){

    async function addConfession(formData: FormData){
        'use server';
        const textData = formData.get("text") as string;
        const insert = await supabase.from("confession").insert({text:textData});
        //console.log(insert.er)
        redirect("/");
    }

    return (
        <form action={addConfession}>
            <label htmlFor="confession">Confession: </label>
            <input id="confession" name="text" type="text"/>
        </form>
        
    );
}