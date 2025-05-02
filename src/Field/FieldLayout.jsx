/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import { Component } from 'react';

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
    [0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
];

class FieldLayoutContainer extends Component {

    onFieldClick = (index) => {
        if (!this.props.field[index] && !this.props.isGameEnded) {
            const newField = [...this.props.field]
            newField.splice(index, 1, this.props.currentPlayer)
            this.props.dispatch({ type: 'SET_FIELD', payload: newField })

            const hasWinner = WIN_PATTERNS.some((pattern) => {
                return pattern.every((position) => {
                    return newField[position] === 'X'
                }) || pattern.every((position) => {
                    return newField[position] === 'O'
                })
            })

            if (hasWinner) {
                this.props.dispatch({ type: 'SET_IS_GAME_ENDED', payload: true })
            } else {
                const isFieldFull = newField.every((cell) => {
                    return cell !== ''
                })
                if (isFieldFull) {
                    this.props.dispatch({ type: 'SET_IS_DRAW', payload: true })
                } else {
                    if (this.props.currentPlayer === 'X') {
                        this.props.dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'O' })
                    } else { this.props.dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'X' }) }
                }
            }
        }
    }

    render() {
        return <div>
            <div className="h-96 grid grid-cols-3 grid-rows-3 gap-0">
                {this.props.field.map((cell, index) => {
                    return <div key={index} className="border-white border-2 bg-gray-500 flex justify-center items-center text-5xl cursor-pointer" onClick={() => this.onFieldClick(index)}>
                        {cell}
                    </div>
                })}

            </div>
        </div >
    }
}

const mapStateToProps = (state) => {
    return {
        currentPlayer: state.currentPlayer,
        isGameEnded: state.isGameEnded,
        field: state.field,
    }
}

export const FieldLayout = connect(mapStateToProps)(FieldLayoutContainer);