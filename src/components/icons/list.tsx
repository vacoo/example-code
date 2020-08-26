import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgList = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fill={props.colorFill} fillRule="nonzero">
            <Path d="M-.087 21.043v7.044H14V14H-.087zM21.826 21.043v7.044h78.261V14h-78.26zM-.087 50.783v7.043H14V43.74H-.087zM21.826 50.783v7.043h78.261V43.74h-78.26zM-.087 78.957V86H14V71.913H-.087zM21.826 78.957V86h78.261V71.913h-78.26z" />
        </G>
    </Svg>
));
