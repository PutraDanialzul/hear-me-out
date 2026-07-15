'use client';

import { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "../images/logo.png";
import Image from "next/image";

export default function AboutPage(){

    interface Content{
        name: any,
        description: any
    }

    const [page, setPage] = useState(0);

    const [topContent, setTopContent] = useState("");
    const [bottomContent, setBottomContent] = useState("");

    const pageCount = 3;

    const contents:Content[] = [
        {
            name: "Background",
            description: "Hear Me Out is a student-centered platform created to support the mental well-being of UNITEN students. We understand that university life can be challenging, with academic pressure, personal responsibilities, financial concerns and social challenges affecting students every day."
        }, {
            name: "Quote",
            description: "At Hear Me Out, every voice matters because sometimes, being heard is the first step toward feeling better"
        }, {
            name: "Our logo",
            description: (<Image alt="Hear Me Out logo" src={logo}/>)
        }
    ];



    useEffect(()=>{
        setTopContent(contents[page].description);
        setBottomContent(contents[page].name);
    }, [page]);

    return (<div className={styles.mainPanel}>
        <h1 className={styles.title}>About Hear Me Out</h1>
        <div className={styles.contents}>
            <button onClick={() => {setPage(prev=>(prev-1 >= 0 ? prev-1 : pageCount-1)); }} className={styles.prevButton}/>
            <div className={styles.content}>
                <div className={styles.top}>{topContent}</div>
                <div className={styles.bottom}>{bottomContent}</div>
            </div>
            <button onClick={() => {setPage(prev=>(prev+1 < pageCount ? prev+1 : 0)); }} className={styles.nextButton}/>
        </div>
    </div>);
}