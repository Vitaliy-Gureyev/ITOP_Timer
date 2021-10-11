import React, {FC, LegacyRef} from 'react';
import {setTimeFormat} from "../../utils/timeFormat";
import styles from './timerComponent.module.css'

interface IProps {
    timer: number,
    handleStart: () => void,
    handleStop: () => void,
    btnWaitRef: LegacyRef<HTMLButtonElement>
    handleReset: () => void
    command: string
}

export const TimerComponent: FC<IProps> = ({timer, handleStart, handleStop, btnWaitRef, handleReset, command}) => {
    return (
        <div className={styles.timerContainer}>
            <article>Timer:</article>
            <p>{setTimeFormat(timer)}</p>
            <div className={styles.command}>{command}</div>
            <div className={styles.buttonsContainer}>
                <button onClick={handleStart}>START</button>
                <button onClick={handleStop}>STOP</button>
                {command === 'stop'
                    ? <button ref={btnWaitRef} disabled={true}>WAIT</button>
                    : <button ref={btnWaitRef}>WAIT</button>}

                <button onClick={handleReset}>RESET</button>
            </div>
        </div>
    );
};