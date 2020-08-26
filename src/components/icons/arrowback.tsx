import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgArrowBack = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M22.22 46.098l44.502-44.5A5.43 5.43 0 0170.59 0a5.43 5.43 0 013.868 1.598l3.278 3.276a5.478 5.478 0 010 7.736l-37.37 37.37 37.411 37.41a5.434 5.434 0 011.598 3.867 5.439 5.439 0 01-1.598 3.87L74.5 98.402A5.431 5.431 0 0170.632 100a5.43 5.43 0 01-3.869-1.598l-44.542-44.54a5.438 5.438 0 01-1.596-3.88 5.436 5.436 0 011.596-3.884z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
