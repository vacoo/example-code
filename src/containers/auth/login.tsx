import React from 'react';
import { ScrollView, RefreshControl, Linking } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Wrapper } from '@components/wrapper';
import { Box } from '@components/ui/box';
import { Input } from '@components/ui/input';
import { FormLabelHead } from '@components/ui/form-label';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import { TermsLink } from '@components/terms-link';
import { Overlay } from '@components/ui/overlay';

import { LOGIN_TYPE } from '@resources/users/_state';
import { getLoginType, getIsSmsCodeSended, getWaitToAt } from '@resources/users/selectors';
import { GlobalState } from '@resources/reducers';
import { StackNavigationProps } from '@resources/navigation-props';
import { options, authLogin } from '@resources/users/actions';
import { UsersReq } from '@resources/ui/_req';
import { getUsersReq } from '@resources/ui/selectors';
import { validateEmail } from '@resources/utils';

type Props = {
    loginType: LOGIN_TYPE;
    isSmsCodeSended: boolean;
    usersReq: UsersReq;
    waitToAt: number;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        loginType: getLoginType(state),
        isSmsCodeSended: getIsSmsCodeSended(state),
        usersReq: getUsersReq(state),
        waitToAt: getWaitToAt(state),
    };
};

export const AuthSignInScreen = connect(mapStateToProps)((props: StackNavigationProps<any> & Props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    return (
        <Wrapper isContrast={true}>
            <Overlay isLoading={false}>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => {
                                dispatch(options());
                            }}
                        />
                    }>
                    <Box isHorizontalSpace={true} isBottomSpace={true} isTopSpace={true}>
                        <FormLabelHead label="Эл. почта" />
                        <Input
                            value={email}
                            autoFocus={true}
                            placeholder="example@mail.ru"
                            onChangeText={(value) => {
                                setEmail(value);
                            }}
                            returnKeyType="done"
                        />
                    </Box>
                    <Box isHorizontalSpace={true} isBottomSpace={true}>
                        <FormLabelHead label="Пароль" />
                        <Input
                            value={password}
                            autoFocus={true}
                            maxLength={100}
                            returnKeyType="done"
                            placeholder="******"
                            onChangeText={(value) => {
                                setPassword(value);
                            }}
                        />
                    </Box>
                    <Box isHorizontalSpace={true} isBottomSpace={true}>
                        <TermsLink
                            onPrivacy={() => {
                                props.navigation.navigate('TermsPrivacy');
                            }}
                            onUse={() => {
                                props.navigation.navigate('TermsUse');
                            }}
                        />
                    </Box>
                    <Box isHorizontalSpace={true}>
                        <Button
                            isDisabled={!validateEmail(email) || password.length === 0}
                            isLoading={props.usersReq.auth_login}
                            type={BUTTON_TYPE.SUCCESS_FILL}
                            onPress={() => {
                                dispatch(authLogin({ email: email, password: password }));
                            }}>
                            Войти
                        </Button>
                    </Box>
                    <Button
                        type={BUTTON_TYPE.LINK_GHOST}
                        onPress={() => {
                            Linking.openURL('https://crm.vodopad.org/auth/forgot');
                        }}>
                        Забыли пароль?
                    </Button>
                </ScrollView>
            </Overlay>
        </Wrapper>
    );
});
