import React from 'react';

interface ArrayMapperProps<T> {
    data: T[]
    children: (item: T) => React.ReactNode
    textPosition: string
    as: 'tbody' | 'div'
}

function ArrayMapper<T>({ data, children, textPosition, as: Component }: ArrayMapperProps<T>) {
    return (
        <Component className={textPosition}>
            {data.map((item, index) => <React.Fragment key={index}>{children(item)}</React.Fragment>)}
        </Component>
    );
}

export default ArrayMapper;
