'use client';

import { useEffect, useState } from "react";
import styles from "./theme-toggle-style.module.css";

export default function ThemeToggle(){

    const [theme, setTheme] = useState("light");

    function checkTheme(){

        const currentTheme =
            localStorage.getItem("theme")
            ?? (
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches
                ? "dark"
                : "light"
            );

        document.documentElement.setAttribute(
            "data-theme",
            currentTheme
        );

        localStorage.setItem(
            "theme",
            currentTheme
        );

        setTheme(currentTheme);
    }

    useEffect(()=>{
        checkTheme();
    }, []);

    function toggleTheme(){

        const targetTheme =
            theme === "dark"
            ? "light"
            : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            targetTheme
        );

        localStorage.setItem(
            "theme",
            targetTheme
        );

        setTheme(targetTheme);
    }

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <span className={styles.sun}>☀️</span>

            <span className={styles.track}>
                <span
                    className={
                        styles.thumb +
                        (
                            theme === "dark"
                            ? " " + styles.dark
                            : ""
                        )
                    }
                />
            </span>

            <span className={styles.moon}>🌙</span>
        </button>
    );
}