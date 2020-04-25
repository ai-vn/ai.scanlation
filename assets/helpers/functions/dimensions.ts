import { FunctionsObject } from '~/types/plugin.postcss';

const map = ['top', 'bottom', 'left', 'right', 'x', 'y'];

function getIndex(dimension: string) {
    const index = map.indexOf(dimension);
    if (index === -1)
        throw new Error(
            `Argument of type ${dimension} is not assignable to parameter of type '${map
                .map(t => `'${t}'`)
                .join(' | ')}'.`,
        );
    return index;
}

function inAxis(axis: string, dimension: string) {
    return (
        (axis === 'x' && ['left', 'right'].includes(dimension)) ||
        (axis === 'y' && ['top', 'bottom'].includes(dimension))
    );
}

const dimensions: FunctionsObject = {
    opposite(dimension) {
        const index = getIndex(dimension);
        const result = index + (index % 2 === 0 ? 1 : -1);
        return map[result];
    },

    only(dimension, value, elseValue) {
        getIndex(dimension);
        return ['top', 'right', 'bottom', 'left']
            .map(item =>
                item === dimension || inAxis(item, dimension)
                    ? value
                    : elseValue,
            )
            .join(' ');
    },
};

export default dimensions;
