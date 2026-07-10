'use client';

import { useEffect } from "react";

export default function RemoveLocalStorage({storageKey}:{storageKey:string}){
    useEffect(()=>{
        localStorage.removeItem(storageKey);
    }, []);
    return null;
}