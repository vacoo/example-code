function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    return typeScriptTpl.ast`
    import * as React from 'react';
    import { Svg, Path, SvgProps, G } from 'react-native-svg';
    
    import { Props } from './_types';

    export const ${componentName} = React.memo((props: SvgProps & Props) => ${jsx});
  `;
}
module.exports = template;
