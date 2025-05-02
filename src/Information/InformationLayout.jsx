import { useSelector, useDispatch } from 'react-redux';
import styles from './Information.module.css'

export const InformationLayout = () => {

    const currentPlayer = useSelector((state) => state.currentPlayer);
    const isGameEnded = useSelector((state) => state.isGameEnded);
    const isDraw = useSelector((state) => state.isDraw);

    const dispatch = useDispatch();

    const onResetClick = () => {
        dispatch({ type: 'RESTART_GAME' })
    }

    return <div className={styles.informationLayout}>
        <div className={styles.info}>
            {isGameEnded
                ? `Победа: ${currentPlayer}`
                : isDraw
                    ? 'Ничья'
                    : `Ходит: ${currentPlayer}`
            }
        </div>
        <button className={styles.startButton} onClick={onResetClick}>Начать заново</button>
    </div>
}
