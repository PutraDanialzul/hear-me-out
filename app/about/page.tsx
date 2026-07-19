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

    const [topContent, setTopContent] = useState<any>("");
    const [bottomContent, setBottomContent] = useState("");

    const pageCount = 3;

    const contents:Content[] = [
        {
            name: "Background",
            description:
                "Hear Me Out is a student-centred platform created to support the mental well-being of UNITEN students. University life can bring academic pressure, personal responsibilities, financial concerns, and social challenges. Sometimes people simply need a safe place to express themselves and be heard."
        },
        {
            name: "Our Mission",
            description:
                "At Hear Me Out, every voice matters because sometimes being heard is the first step toward feeling better. The platform encourages respectful expression, reflection, and mutual understanding."
        },{
            name: "Our Identity",
            description: (
                <div
                    style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1.5rem"
                    }}
                >
                    <Image src={logo} alt="Hear Me Out logo"
                        style={{
                            width: "220px",
                            height: "auto"
                        }}
                    />
                    
                    <p
                        style={{
                            margin: 0,
                            maxWidth: "600px",
                            lineHeight: "1.9",
                            color: "var(--text-secondary)"
                        }}
                    >
                        The Hear Me Out logo represents a safe space
                        for expression, reflection, and understanding.
                        Just as every person carries thoughts that are
                        difficult to share, Hear Me Out exists to help
                        users express themselves openly while feeling
                        respected, supported, and heard.
                    </p>
                </div>
            )
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