'use client';

import { useEffect, useState } from "react";
import styles from "./old-confession-menu-style.module.css"
import { createClient } from "../../lib/supabase/client";
import { getDate } from "../../lib/functions";
import Link from "next/link";
import DateTimeComponent from "../datetime-component";

export default function OldConfessionMenu(){

    interface Confession{
        created_at: string,
        text: string,
        id: string,
        confessor_id: string,
        verified: boolean
    }

    const [ page, setPage ] = useState(0);
    const [ haveNextPage, setHaveNextPage ] = useState(true);
    const [ havePreviousPage, setHavePreviousPage ] = useState(true);
    const [ hide, setHide ] = useState(false);
    const [ total, setTotal ] = useState(0);
    const [ confessions, setConfessions ] = useState<Confession[]>([]);

    function getPageCount(){
        return Math.ceil(total/4);
    }

    async function updateData(){
        setHavePreviousPage(page > 0); setHaveNextPage(page < getPageCount()-1); 
        const supabase = createClient();
        const user = await supabase.auth.getUser();
        if(!user.data.user){
            return;
        }
        const id = user.data.user.id;
        const select = await supabase.from("confession").select("created_at, text, id, confessor_id, verified").eq("confessor_id", id).order("created_at", {ascending: false}).range(page * 4, (page+1) * 4 - 1);
        setConfessions(select.data ?? []);
    }

    useEffect(()=>{
        async function initialization(){
            const supabase = createClient();
            const user = await supabase.auth.getUser();
            if(!user.data.user){
                return;
            }
            const id = user.data.user.id;
            const select = await supabase.from("confession").select("confessor_id").eq("confessor_id", id);
            setTotal(select.data?.length ?? 0);
        }
        initialization();
        function sizeFunction(){
            const matchSize = window.matchMedia("screen and (max-width: 700px)");
            setHide(matchSize.matches);
        }
        sizeFunction();
        window.addEventListener("resize", sizeFunction);
        return () => {
            window.removeEventListener("resize", sizeFunction);
        }
    }, []);

    useEffect(()=>{
        updateData();
    }, [total, page]);

    const previousButton = (<button onClick={()=>{ setPage(prev=>Math.max(0, prev-1));}} className={styles.previousButton}/>);
    const nextButton = (<button onClick={()=>{ setPage(prev=>Math.min(getPageCount()-1, prev+1));}} className={styles.nextButton}/>);

    const unverified = (<span style={{color: "red"}}>(unverified)</span>);

    return hide ? null : (<div className={styles.oldConfessionMenu}>
        <h1>Past Confessions</h1>
        <div className={styles.cardContainer}>
            {confessions.map((confession)=>(<Link href={`/confession?id=${confession.id}`} key={confession.id} className={styles.card}>
                <p className={styles.cardDate}>
                    <DateTimeComponent datetime={confession.created_at} showDate showTime/> {confession.verified ? null : unverified}
                </p>
                <p className={styles.cardContent}>
                    {confession.text}
                </p>
            </Link>))}
            {havePreviousPage ? previousButton : null}
            {haveNextPage ? nextButton : null}
        </div>
    </div>);
}