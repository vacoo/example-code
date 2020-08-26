import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgMore = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fill={props.colorFill} fillRule="nonzero">
            <Path d="M96.256 41.194a12.326 12.326 0 010 17.526c-4.878 4.84-12.785 4.84-17.663 0a12.326 12.326 0 010-17.526c4.878-4.84 12.785-4.84 17.663 0M58.788 41.194a12.326 12.326 0 010 17.526c-4.877 4.84-12.785 4.84-17.662 0a12.326 12.326 0 010-17.526c4.877-4.84 12.785-4.84 17.662 0M21.32 41.194a12.326 12.326 0 010 17.526c-4.877 4.84-12.785 4.84-17.662 0a12.326 12.326 0 010-17.526c4.877-4.84 12.785-4.84 17.663 0" />
        </G>
    </Svg>
));
