import React from 'react';
import { Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
const packageJSON = require('@root/package.json');

import { Wrapper } from '@components/wrapper';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';

type Props = {};

const mapStateToProps = (state: GlobalState): Props => {
    return {};
};

export const HelpScreen = connect(mapStateToProps)((props: BottomTabNavigationProps<any> & Props) => {
    const dispatch = useDispatch();

    return (
        <Wrapper isContrast={true}>
            <Text>help</Text>
        </Wrapper>
    );
});
