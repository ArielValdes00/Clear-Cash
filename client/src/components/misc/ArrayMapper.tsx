import React from 'react';

interface ArrayMapperProps<T> {
    data: T[]
    children: (item: T) => React.ReactNode
}

function ArrayMapper<T>({ data, children }: ArrayMapperProps<T>) {
    return (
        <tbody className="text-end">
            {data.map((item) => children(item))}
        </tbody>
    );
}

export default ArrayMapper;
