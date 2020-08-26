import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgArrowRight = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <Path
            d="M73.945 47.256L31.124 1.13c-1.403-1.51-3.675-1.508-5.075.008-1.4 1.515-1.396 3.97.007 5.481L66.328 50 26.055 93.38c-1.403 1.511-1.407 3.965-.008 5.48.702.76 1.622 1.14 2.542 1.14.918 0 1.834-.377 2.535-1.132l42.821-46.124A4.033 4.033 0 0075 50c0-1.03-.38-2.017-1.055-2.744z"
            fill={props.colorFill}
            fillRule="nonzero"
        />
    </Svg>
));
