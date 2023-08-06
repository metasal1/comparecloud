import styles from '../styles/Home.module.css'
export default function Grid() {

    return (<div className={styles.grid}>
        <a href="https://aws.amazon.com" className={styles.card}>
            <h2>Amazon &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://gcp.google.com" className={styles.card}>
            <h2>Google &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
            href="https://azure.microsoft.com/en-us/"
            className={styles.card}
        >
            <h2>Microsoft &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
            href="https://www.oracle.com/cloud/"
            className={styles.card}
        >
            <h2>Oracle &rarr;</h2>
            <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
        </a>
    </div>)
}