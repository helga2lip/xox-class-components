import { Component } from "react"
import { Field } from "../Field/Field"
import { Information } from "../Information/Information"

export class GameLayout extends Component {
    render() {
        return <div className="mx-auto my-10 w-96 flex flex-col gap-5">
            <Information />
            <Field />
        </div >
    }
}
