import * as React from 'react';
import { Svg, Path, SvgProps, G } from 'react-native-svg';
import { Props } from './_types';
export const SvgTimeback = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fill={props.colorFill} fillRule="nonzero">
            <Path d="M72.385 52.678c0-3.5-2.837-6.315-6.337-6.315H55.546v-19c0-3.5-2.883-6.337-6.383-6.337s-6.383 2.837-6.383 6.337v25.348c0 3.5 2.866 6.285 6.366 6.285h16.897c3.505-.003 6.342-2.818 6.342-6.318z" />
            <Path d="M49.133 2.628C22.039 2.628 0 24.67 0 51.758a48.86 48.86 0 009.03 28.35l-5.087 5.027a2.924 2.924 0 00-.654 3.182 2.922 2.922 0 002.696 1.818l18.308.076a3.891 3.891 0 003.905-3.85l.165-18.309a2.918 2.918 0 00-1.783-2.717 2.914 2.914 0 00-3.19.608l-5.153 5.085c-3.513-5.593-5.563-12.189-5.563-19.27 0-20.101 16.354-36.458 36.459-36.458 20.102 0 36.456 16.354 36.456 36.459 0 15.324-9.51 28.426-22.937 33.793a6.397 6.397 0 00-3.898 7.178 6.314 6.314 0 008.535 4.63c18.126-7.23 30.976-24.925 30.976-45.601-.002-27.09-22.043-49.13-49.132-49.13z" />
        </G>
    </Svg>
));
