import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgHelp = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M50 0c27.57 0 50 22.43 50 50s-22.43 50-50 50S0 77.57 0 50 22.43 0 50 0zm0 9.09C27.442 9.09 9.09 27.444 9.09 50c0 22.558 18.352 40.91 40.91 40.91 22.557 0 40.91-18.352 40.91-40.91C90.91 27.443 72.557 9.09 50 9.09zm0 33.334a4.547 4.547 0 014.496 3.874l.05.672v27.272a4.546 4.546 0 01-9.042.672l-.05-.672V46.97A4.546 4.546 0 0150 42.424zm0-21.212c3.34 0 6.059 2.72 6.059 6.063a6.065 6.065 0 01-6.06 6.058 6.065 6.065 0 01-6.059-6.058A6.068 6.068 0 0150 21.212z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
