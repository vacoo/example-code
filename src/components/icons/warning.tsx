import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgWarning = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fillRule="nonzero" fill="none">
            <Path
                d="M98.254 78.975L58.806 10.65a10.266 10.266 0 00-8.574-5.125l33.74 88.785h5.415c5.641 0 10.232-4.59 10.232-10.232 0-1.791-.473-3.556-1.365-5.102z"
                fill="#FFD764"
            />
            <Path
                d="M91.62 78.975a11.486 11.486 0 011.178 5.102c0 5.641-3.959 10.232-8.827 10.232h-73.48c-5.642 0-10.232-4.59-10.232-10.232 0-1.791.473-3.556 1.364-5.102L41.071 10.65a10.275 10.275 0 018.868-5.132c.097 0 .195.002.293.007 3.03.118 5.83 2.057 7.355 5.125L91.62 78.975z"
                fill="#FFD764"
            />
            <Path d="M49.939 71.571V82.94a5.683 5.683 0 005.684-5.685 5.683 5.683 0 00-5.684-5.684z" fill="#3B4145" />
            <Path
                d="M49.939 71.571c.627 0 1.137 2.544 1.137 5.684s-.51 5.685-1.137 5.685a5.683 5.683 0 01-5.685-5.685 5.683 5.683 0 015.685-5.684z"
                fill="#525A61"
            />
            <Path
                d="M49.939 22.688V64.75a5.685 5.685 0 005.684-5.684V28.372a5.683 5.683 0 00-5.684-5.684z"
                fill="#3B4145"
            />
            <Path
                d="M49.939 22.688c.627 0 1.137 2.544 1.137 5.684v30.695c0 3.137-.51 5.684-1.137 5.684a5.685 5.685 0 01-5.685-5.684V28.372a5.683 5.683 0 015.685-5.684z"
                fill="#525A61"
            />
        </G>
    </Svg>
));
