'use client';

import { useEffect, useState } from "react";
import styles from "./form-style.module.css";

export default function DraftTextarea({name, storageKey, placeholder, maxLength=1500}:{placeholder?: string, name:string, storageKey: string, maxLength?: number}){
    const [draft, setDraft] = useState(localStorage.getItem(storageKey) ?? "");
    const [length, setLength] = useState(0);
    useEffect(()=>{
        setDraft(localStorage.getItem(storageKey) ?? "");
    }, []);
    useEffect(()=>{
        localStorage.setItem(storageKey, draft);
        setLength(draft.length);
    }, [draft]);
    return (<div className={styles.areaBox}>
        <textarea placeholder={placeholder} className={styles.textArea} maxLength={maxLength} id="textarea" name={name} value={draft} onChange={(event)=>{
            setDraft(event.target.value);
        }}>
        </textarea>
        <span className={styles.textCount}>{length}/{maxLength}</span>
    </div>)
}