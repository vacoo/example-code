import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';

import * as COLORS from '@components/ui/colors';

import { MainStacks } from '@containers/index';

import { Store } from '@resources/store';

const store = Store();
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    '`-[RCTRootView cancelTouches]`',
    'Warning: componentWillMount',
    'Warning: componentWillReceiveProps',
    'source.uri should',
    'componentWillMount has been renamed, and is not recommended for use',
    'componentWillReceiveProps has been renamed, and is not recommended for use',
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`',
    'Task orphaned for request <NSMutableURLRequest:',
    'getNode()',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Animated.event now requires a second argument for options',
]);

export default class Root extends React.Component {
    constructor(props: any) {
        super(props);
        RNBootSplash.hide({ duration: 0 });
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar barStyle="default" backgroundColor={COLORS.COLOR_NAV_TOP} />
                <SafeAreaProvider>
                    <NavigationContainer>
                        <MainStacks />
                    </NavigationContainer>
                    <FlashMessage position='top' animationDuration={150} />
                </SafeAreaProvider>
            </Provider>
        );
    }
}
