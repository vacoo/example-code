import React from 'react';
import { Text, Image, FlatList, Animated, Easing } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Wrapper } from '@components/wrapper';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import { SvgHelp, SvgPhone } from '@components/icons';
import { Box } from '@components/ui/box';
import { Header } from '@components/header';
import { List, ListItem, ListHelp, ListItemText } from '@components/ui/list';
import { Switch } from '@components/ui/switch';
import { BadgeStatus } from '@components/ui/badge-status';
import * as COLORS from '@components/ui/colors';
import { formatPhone } from '@resources/utils';
import { ListEmpty } from '@components/list-empty';
import { ModalOK } from '@components/modal-ok';

type Props = {};

const mapStateToProps = (state: GlobalState): Props => {
    return {};
};

export const MainScreen = connect(mapStateToProps)((props: BottomTabNavigationProps<any> & Props) => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    return (
        <Wrapper isContrast={true}>
            <ModalOK
                show={modalShow}
                onClose={() => {
                    setModalShow(false);
                }}
            />
            <FlatList
                data={[1, 2, 3, 4, 5]}
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
                                setModalShow(true);
                            }}>
                            <Switch value={false} onChange={() => {}} />
                        </ListItem>
                        <ListItem label="Подключение к WI-FI" onPress={() => {}}>
                            <BadgeStatus isActive={true} />
                        </ListItem>
                        <ListItem label="Разрешение на чтение телефонных вызовов" onPress={() => {}}>
                            <BadgeStatus isActive={true} />
                        </ListItem>
                        <ListHelp>События</ListHelp>
                    </React.Fragment>
                }
                ListEmptyComponent={<ListEmpty>Список пуст</ListEmpty>}
                ListFooterComponent={
                    <Button type={BUTTON_TYPE.LINK_GHOST} onPress={() => {}}>
                        Отправить в CRM тестовой звонок
                    </Button>
                }
                style={{ height: '100%' }}
                keyExtractor={(item, index) => {
                    return String(index);
                }}
                renderItem={() => (
                    <ListItem
                        iconLeft={<SvgPhone width={12} height={12} colorFill={COLORS.COLOR_MAIN} />}
                        label="Входящий звонок"
                        onPress={() => {}}>
                        <ListItemText>{formatPhone('+79142283763')}</ListItemText>
                    </ListItem>
                )}
            />
        </Wrapper>
    );
});
