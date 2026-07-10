'use client';

import { useEffect, useState } from "react";
import styles from "./form-style.module.css";

export default function DraftTextarea({name, storageKey, maxLength=1500}:{name:string, storageKey: string, maxLength: number}){
    const [draft, setDraft] = useState(localStorage.getItem(storageKey) ?? "");
    const [length, setLength] = useState(0);
    useEffect(()=>{
        setDraft(localStorage.getItem(storageKey) ?? "");
    }, []);
    useEffect(()=>{
        localStorage.setItem(storageKey, draft);
        setLength(draft.length);
    }, [draft]);
    return (<div>
        <textarea className={styles.textArea} maxLength={maxLength} id="textarea" name={name} value={draft} onChange={(event)=>{
            setDraft(event.target.value);
        }}/>;
        <p>{length}/{maxLength}</p>
    </div>)
}