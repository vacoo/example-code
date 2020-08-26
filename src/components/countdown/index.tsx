import React from 'react';
import { View, Text } from 'react-native';

import { Countdown, getNowUnix, getCountdown } from '@resources/utils/time';

const initial: Countdown = {
    millisecond: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
};

export function useCountdown(waitToAt: number): [Countdown, boolean, (n: number) => void] {
    const [wait, setWait] = React.useState<number>(waitToAt);
    const [cnt, setCnt] = React.useState<Countdown>(initial);
    const [resend, setResend] = React.useState<boolean>(false);

    React.useEffect(() => {
        const set = () => {
            let left = wait - getNowUnix();

            if (left < 0) {
                setResend(true);
                setCnt(initial);
            } else {
                setResend(false);
                setCnt(getCountdown(left));
            }
        };

        set();

        let t = setInterval(set, 1000);

        return () => {
            clearInterval(t);
        };
    }, [wait]);

    return [cnt, resend, setWait];
}
