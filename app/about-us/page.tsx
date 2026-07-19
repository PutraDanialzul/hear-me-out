import styles from "./style.module.css";

export default function AboutUsPage(){

    const members = [
        {
            name: "Team Member",
            role: "Role",
            description:
                "Short description about responsibilities and contributions."
        },
        {
            name: "Team Member",
            role: "Role",
            description:
                "Short description about responsibilities and contributions."
        },
        {
            name: "Team Member",
            role: "Role",
            description:
                "Short description about responsibilities and contributions."
        },
        {
            name: "Team Member",
            role: "Role",
            description:
                "Short description about responsibilities and contributions."
        }
    ];

    return (
        <div className={styles.mainPanel}>

            <h1 className={styles.title}>
                About Us
            </h1>

            <p className={styles.subtitle}>
                Hear Me Out was created as a collaborative
                effort to provide a safe space for
                expression, reflection, and support.
            </p>

            <div className={styles.contents}>
                {members.map((member, index) => (
                    <div
                        key={index}
                        className={styles.card}
                    >
                        <div className={styles.picture}/>

                        <p className={styles.name}>
                            {member.name}
                        </p>

                        <p className={styles.role}>
                            {member.role}
                        </p>

                        <p className={styles.description}>
                            {member.description}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}