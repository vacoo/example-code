import * as React from 'react';
import { Svg, Path, SvgProps, G, Circle } from 'react-native-svg';
import { Props } from './_types';
export const SvgCancelBold = React.memo((props: SvgProps & Props) => (
    <Svg width={100} height={100} viewBox="0 0 100 100" {...props}>
        <G fill="none" fillRule="evenodd">
            <Circle fill={props.colorFill} cx={50} cy={50} r={50} />
            <Path
                d="M55.264 50l17.87-17.87a2.6 2.6 0 00.763-1.849c0-.7-.27-1.357-.763-1.848l-1.566-1.566a2.593 2.593 0 00-1.85-.763c-.699 0-1.355.27-1.847.763L50 44.737l-17.87-17.87a2.59 2.59 0 00-1.85-.763c-.699 0-1.355.27-1.847.763l-1.567 1.566a2.616 2.616 0 000 3.696L44.737 50l-17.87 17.87a2.598 2.598 0 00-.762 1.849c0 .7.27 1.356.762 1.848l1.567 1.566a2.592 2.592 0 001.847.763c.7 0 1.357-.27 1.849-.763L50 55.263l17.87 17.87a2.594 2.594 0 001.848.763h.001c.7 0 1.356-.27 1.848-.763l1.566-1.566a2.598 2.598 0 00.763-1.848c0-.7-.271-1.356-.763-1.849L55.264 50z"
                fill="#FFF"
                fillRule="nonzero"
            />
        </G>
    </Svg>
));
