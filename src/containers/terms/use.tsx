import React from 'react';
import { } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, connect } from 'react-redux';
import { HOST } from 'react-native-dotenv';

import { Wrapper } from '@components/wrapper';

import { StackNavigationProps } from '@resources/navigation-props';
import { GlobalState } from '@resources/reducers';
import { getProtocol } from '@resources/utils/request';

type Props = {};

const mapStateToProps = (state: GlobalState): Props => {
    return {};
};

export const TermsUseScreen = connect(mapStateToProps)((props: StackNavigationProps<any> & Props) => {
    const dispatch = useDispatch();
    return (
        <Wrapper isContrast={true}>
            <WebView
                cacheMode="LOAD_NO_CACHE"
                source={{
                    uri: getProtocol() + HOST + '/terms/use',
                }}
            />
        </Wrapper>
    );
});
