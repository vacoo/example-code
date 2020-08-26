import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgCheck = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M49.974 0c27.6 0 49.973 22.374 49.973 49.974 0 27.6-22.374 49.973-49.973 49.973C22.65 99.947.448 78.018.007 50.8L0 49.974C-.078 22.452 22.168.079 49.69 0h.284zm19.591 28.252l-27.4 27.4-11.783-11.641-8.093 7.95 19.876 19.734 35.493-35.493-8.093-7.95z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
