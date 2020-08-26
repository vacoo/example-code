import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgPhone = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M97.378 73.39L83.393 59.435c-4.994-4.984-13.485-2.99-15.483 3.488-1.498 4.486-6.493 6.978-10.988 5.981-9.989-2.492-23.474-15.45-25.971-25.917-1.499-4.486 1.498-9.47 5.993-10.965 6.493-1.993 8.49-10.466 3.496-15.45L26.456 2.617c-3.996-3.49-9.99-3.49-13.486 0l-9.49 9.47c-9.489 9.967 1 36.383 24.474 59.808 23.474 23.425 49.945 34.39 59.934 24.421l9.49-9.47c3.496-3.987 3.496-9.967 0-13.456z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
