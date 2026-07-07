import Image from "next/image";
import styles from "./header-style.module.css"
import Link from "next/link";

export default function HeaderPanel(){
    return(
        <header className={styles.header}>
            <div className={styles.logoContainer}>

            </div>
            <div className={styles.linkContainer}>
                <button>Test 1</button>
                <button>Test 2</button>
                <button>Test 3</button>
            </div>
        </header>
    );
}