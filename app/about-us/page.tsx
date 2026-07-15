import styles from "./style.module.css";

export default function AboutUsPage(){
    return (<div className={styles.mainPanel}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.contents}>
            <div className={styles.card}>
                <div className={styles.picture}></div>
                <br/>
                <p className={styles.name}>Sigma</p>
                <br/>
                <p className={styles.description}>role</p>
            </div>
            <div className={styles.card}>
                <div className={styles.picture}></div>
                <br/>
                <p className={styles.name}>Sigma</p>
                <br/>
                <p className={styles.description}>role</p>
            </div>
            <div className={styles.card}>
                <div className={styles.picture}></div>
                <br/>
                <p className={styles.name}>Sigma</p>
                <br/>
                <p className={styles.description}>role</p>
            </div>
            <div className={styles.card}>
                <div className={styles.picture}></div>
                <br/>
                <p className={styles.name}>Sigma</p>
                <br/>
                <p className={styles.description}>role</p>
            </div>
        </div>
    </div>);
}