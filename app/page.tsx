import styles from "./styles.module.css"

export default function Page(){
    return (
        <div>
            Hear me out! ^w^
            <div className={styles.container1}>
                <div className={styles.container2}>
                    <button className={styles.cuteButton}>Try to Click Me!</button>
                </div>
            </div>
        </div>
    );
}