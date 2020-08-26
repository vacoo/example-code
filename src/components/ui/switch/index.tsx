import React from 'react';
import SwitchDraggable from 'react-native-draggable-switch';

import * as COLORS from '@components/ui/colors';

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
};

export const Switch = (props: Props) => {
    return (
        <SwitchDraggable
            width={40}
            height={22}
            backgroundColor={COLORS.COLOR_INPUT_PLACEHOLDER}
            activeColor={COLORS.COLOR_SUCCESS}
            value={props.value}
            onValueChange={props.onChange}
        />
    );
};
