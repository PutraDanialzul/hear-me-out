import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default function ConfessionForm(){

    async function addConfession(formData: FormData){
        'use server';
        const supabase = await createClient();
        const textData = formData.get("text") as string;
        const insert = await supabase.from("confession").insert({text:textData});
        if(insert.error){
            redirect(`/confess?error=${encodeURIComponent("Error: "+insert.error.message+". ")}`);
        }
        else redirect("/");
    }

    return (
        <form action={addConfession}>
            <label htmlFor="confession">Confession: </label>
            <input id="confession" name="text" type="text"/>
        </form>
        
    );
}