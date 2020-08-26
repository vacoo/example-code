import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgArrowDown = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M52.744 73.945L98.87 31.124c1.51-1.403 1.508-3.675-.008-5.075-1.515-1.4-3.97-1.396-5.481.007L50 66.328 6.62 26.055c-1.511-1.403-3.965-1.407-5.48-.008C.38 26.75 0 27.67 0 28.59c0 .918.377 1.834 1.132 2.535l46.124 42.821A4.033 4.033 0 0050 75c1.03 0 2.017-.38 2.744-1.055z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
