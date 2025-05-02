import { Field } from "../Field/Field"
import { Information } from "../Information/Information"
import styles from './Game.module.css'

export const GameLayout = () => {
    return <div className={styles.gameLayout}>
        <Information />
        <Field />
    </div>
}
