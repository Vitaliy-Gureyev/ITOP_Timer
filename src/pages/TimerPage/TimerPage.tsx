import React, { FC, useEffect, useRef, useState } from 'react';
import { Observable, Subject, fromEvent } from 'rxjs';
import { buffer, takeUntil, debounceTime, filter } from 'rxjs/operators';
import { TimerComponent } from '../../components/timerComponent';

export const TimerPage: FC = () => {
  const [timer, setTimer] = useState(0);
  const [command, setCommand] = useState('stop');

  const btnWaitRef = useRef(null);

  useEffect(() => {
    const stop$ = new Subject();

    const clickWait$ = fromEvent(btnWaitRef.current!, 'click');

    const doubleClickWait$ = clickWait$
      .pipe(
        buffer(clickWait$.pipe(debounceTime(300))),
        filter((clickArr) => clickArr.length > 1),
      )
      .subscribe(() => {
        setCommand('wait');
      });

    const timer$ = new Observable((observer) => {
      let count = 0;
      const interval = setInterval(() => {
        observer.next((count += 1));
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    });

    const subscription$ = timer$.pipe(takeUntil(stop$)).subscribe({
      next: () => {
        if (command === 'start') {
          setTimer((prevState) => prevState + 1);
        }
      },
    });

    return () => {
      subscription$.unsubscribe();
      doubleClickWait$.unsubscribe();
    };
  }, [command]);

  const handleStart = () => {
    setCommand('start');
  };

  const handleStop = () => {
    setTimer(0);
    setCommand('stop');
  };

  const handleReset = () => {
    setTimer(0);
  };

  return (
    <div>
      <TimerComponent
        timer={timer}
        command={command}
        handleReset={handleReset}
        handleStart={handleStart}
        handleStop={handleStop}
        btnWaitRef={btnWaitRef}
      />
    </div>
  );
};
