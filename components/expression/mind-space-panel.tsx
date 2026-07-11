import styles from "./mind-space-style.module.css"
import MindSpaceLeft from "./mind-space-left";
import { ReactNode } from "react";

export default function MindSpacePanel({children}: {children?: ReactNode}){
    return (<div className={styles.panel}>
        <MindSpaceLeft/>
        <div className={styles.rightSide}>{children}</div>
    </div>);
}