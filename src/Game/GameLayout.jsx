import { Component } from "react"
import { Field } from "../Field/Field"
import { Information } from "../Information/Information"
import styles from './Game.module.css'

export class GameLayout extends Component {
    render() {
        return <div className={styles.gameLayout}>
            <Information />
            <Field />
        </div >
    }
}
