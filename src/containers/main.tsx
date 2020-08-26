import React from 'react';
import { Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Wrapper } from '@components/wrapper';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import { Box } from '@components/ui/box';
import { Header } from '@components/header';
import { ListItem } from '@components/ui/list';
import { Switch } from '@components/ui/switch';
import { BadgeStatus } from '@components/ui/badge-status';
import { ModalOK } from '@components/modal-ok';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';
import { getStatus } from '@resources/ats/selectors';
import { toogle, eventCallTestSend, permissionsRequest } from '@resources/ats/actions';
import { Status } from '@resources/ats/_state';

type Props = {
    status: Status;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        status: getStatus(state),
    };
};

export const MainScreen = connect(mapStateToProps)((props: BottomTabNavigationProps<any> & Props) => {
    const dispatch = useDispatch();
    const [isManual, setIsManual] = React.useState<boolean>(false);
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    // Включить ATS
    const onEnable = (enable: boolean) => {
        dispatch(toogle({ enable }));
        setIsManual(true);
    };

    React.useEffect(() => {
        // Показать окно с ОК
        if (props.status.isPermissions && props.status.isWiFi && props.status.isEnabled && isManual) {
            setIsManual(false);
            setModalShow(true);
        }
    }, [props.status]);

    return (
        <Wrapper isContrast={true}>
            <ModalOK
                show={modalShow}
                onClose={() => {
                    setModalShow(false);
                }}
            />
            <React.Fragment>
                <Box isHorizontalSpace={true}>
                    <Header
                        onPress={() => {
                            props.navigation.navigate('Help');
                        }}
                    />
                </Box>
                <ListItem
                    label="Включить телефонию"
                    onPress={() => {
                        onEnable(!props.status.isEnabled);
                    }}>
                    <Switch
                        value={props.status.isEnabled}
                        onChange={(value) => {
                            onEnable(value);
                        }}
                    />
                </ListItem>
                <ListItem
                    label="Подключение к WI-FI"
                    onPress={() => {
                        if (props.status.isWiFi) {
                            Alert.alert('Статус', 'Вы подключены к WI-FI');
                        } else {
                            Alert.alert('Статус', 'Подключитесь к WI-FI точке');
                        }
                    }}>
                    <BadgeStatus isActive={props.status.isWiFi} />
                </ListItem>
                <ListItem
                    label="Разрешение на чтение телефонных вызовов"
                    onPress={() => {
                        if (props.status.isPermissions) {
                            Alert.alert('Статус', 'У приложения уже есть разрешения');
                        } else {
                            dispatch(permissionsRequest());
                        }
                    }}>
                    <BadgeStatus isActive={props.status.isPermissions} />
                </ListItem>
                <Button
                    type={BUTTON_TYPE.LINK_GHOST}
                    isDisabled={!props.status.isEnabled}
                    onPress={() => {
                        dispatch(eventCallTestSend());
                    }}>
                    Отправить в CRM тестовой звонок
                </Button>
            </React.Fragment>
        </Wrapper>
    );
});
