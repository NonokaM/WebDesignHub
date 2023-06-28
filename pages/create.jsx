import styles from '../styles/create.module.css'

export default function Create() {
    return(
        <div className={styles.container}>
            <input type="text" placeholder="Enter URL"/>
            <button>button</button>
        </div>
    )
}
