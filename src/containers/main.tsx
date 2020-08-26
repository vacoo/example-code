import React from 'react';
import { FlatList } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Wrapper } from '@components/wrapper';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import { SvgPhone } from '@components/icons';
import { Box } from '@components/ui/box';
import { Header } from '@components/header';
import { ListItem, ListHelp, ListItemText } from '@components/ui/list';
import { Switch } from '@components/ui/switch';
import { BadgeStatus } from '@components/ui/badge-status';
import * as COLORS from '@components/ui/colors';
import { formatPhone } from '@resources/utils';
import { ListEmpty } from '@components/list-empty';
import { ModalOK } from '@components/modal-ok';
import { getStatus, getCalls } from '@resources/ats/selectors';
import { toogle, eventCallSend } from '@resources/ats/actions';
import { Status } from '@resources/ats/_state';
import { EventCall, CALL_STATUS_LABEL, initialEventCall, CALL_STATUS } from '@resources/ats/_event-call';

type Props = {
    status: Status;
    calls: EventCall[];
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        status: getStatus(state),
        calls: getCalls(state),
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
            <FlatList
                data={props.calls}
                refreshing={false}
                onRefresh={() => {}}
                ListHeaderComponent={
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
                        <ListItem label="Подключение к WI-FI" onPress={() => {}}>
                            <BadgeStatus isActive={props.status.isWiFi} />
                        </ListItem>
                        <ListItem label="Разрешение на чтение телефонных вызовов" onPress={() => {}}>
                            <BadgeStatus isActive={props.status.isPermissions} />
                        </ListItem>
                        <Button
                            type={BUTTON_TYPE.LINK_GHOST}
                            onPress={() => {
                                dispatch(
                                    eventCallSend({
                                        eventCall: {
                                            ...initialEventCall,
                                            status: CALL_STATUS.INCOMING,
                                            phone: '+79111111111',
                                        },
                                    }),
                                );
                            }}>
                            Отправить в CRM тестовой звонок
                        </Button>
                        <ListHelp>События</ListHelp>
                    </React.Fragment>
                }
                ListEmptyComponent={<ListEmpty>Пока звонков нету</ListEmpty>}
                style={{ height: '100%' }}
                keyExtractor={(item, index) => {
                    return String(index);
                }}
                renderItem={({ item }) => (
                    <ListItem
                        iconLeft={<SvgPhone width={12} height={12} colorFill={COLORS.COLOR_MAIN} />}
                        label={CALL_STATUS_LABEL[item.status]}
                        onPress={() => {}}>
                        <ListItemText>{formatPhone(item.phone)}</ListItemText>
                    </ListItem>
                )}
            />
        </Wrapper>
    );
});
