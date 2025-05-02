import { useSelector, useDispatch } from 'react-redux';
import styles from './Field.module.css'

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
    [0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
];

export const FieldLayout = () => {

    const currentPlayer = useSelector((state) => state.currentPlayer);
    const field = useSelector((state) => state.field);
    const isGameEnded = useSelector((state) => state.isGameEnded);

    const dispatch = useDispatch();

    const onFieldClick = (index) => {
        if (!field[index] && !isGameEnded) {
            const newField = [...field]
            newField.splice(index, 1, currentPlayer)
            dispatch({ type: 'SET_FIELD', payload: newField })

            const hasWinner = WIN_PATTERNS.some((pattern) => {
                return pattern.every((position) => {
                    return newField[position] === 'X'
                }) || pattern.every((position) => {
                    return newField[position] === 'O'
                })
            })

            if (hasWinner) {
                dispatch({ type: 'SET_IS_GAME_ENDED', payload: true })
            } else {
                const isFieldFull = newField.every((cell) => {
                    return cell !== ''
                })
                if (isFieldFull) {
                    dispatch({ type: 'SET_IS_DRAW', payload: true })
                } else {
                    if (currentPlayer === 'X') {
                        dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'O' })
                    } else { dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'X' }) }
                }
            }
        }
    }

    return <div className={styles.fieldLayout}>
        <div className={styles.fieldGrid}>
            {field.map((cell, index) => {
                return <div key={index} className={styles.fieldCell} onClick={() => onFieldClick(index)}>
                    {cell}
                </div>
            })}

        </div>
    </div>
}
