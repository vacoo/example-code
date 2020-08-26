import React from 'react';
import { Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Wrapper } from '@components/wrapper';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';
import { Order } from '@resources/orders/_order';
import { USER_ROLE } from '@resources/users/_user';
import { getOrders } from '@resources/orders/selectors';
import { OrdersReq } from '@resources/ui/_req';
import { getOrdersReq, getOrdersIDsReq } from '@resources/ui/selectors';
import { getSupplierBalance } from '@resources/suppliers/selectors';
import { Options } from '@resources/users/_options';
import { getOptions, getProfileRole } from '@resources/users/selectors';
import { getIsDriverAccept } from '@resources/drivers/selectors';

type Props = {};

const mapStateToProps = (state: GlobalState): Props => {
    return {};
};

export const MainScreen = connect(mapStateToProps)((props: BottomTabNavigationProps<any> & Props) => {
    const dispatch = useDispatch();

    return (
        <Wrapper isContrast={true}>
            <Text>main</Text>
        </Wrapper>
    );
});
