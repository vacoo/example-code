import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgError = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fillRule="nonzero" fill="none">
            <Path
                d="M85.393 14.67c19.456 19.47 19.443 51.026-.028 70.482-19.47 19.455-51.026 19.443-70.481-.028-19.445-19.46-19.445-50.994 0-70.454 19.344-19.47 50.81-19.573 70.28-.228l.23.228z"
                fill="#FB4343"
            />
            <Path
                fill="#D4E1F4"
                d="M74.916 33.784l-16.14 16.14 16.14 16.142-8.637 8.636-16.14-16.14-16.141 16.14-8.637-8.636 16.14-16.141-16.14-16.141 8.637-8.637 16.14 16.141 16.141-16.14z"
            />
        </G>
    </Svg>
));
