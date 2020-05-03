// eslint-disable-next-line import/no-extraneous-dependencies
import { FunctionsObject } from 'postcss-functions';

const map = ['top', 'bottom', 'left', 'right', 'x', 'y'];
const directions = ['top', 'right', 'bottom', 'left'];

function getIndex(direction: typeof map[number]) {
    const index = map.indexOf(direction);
    if (index === -1)
        throw new Error(
            `Argument of type ${direction} is not assignable to parameter of type ${map
                .map(t => `'${t}'`)
                .join(' | ')}.`,
        );
    return index;
}

function inAxis(
    axis: typeof directions[number],
    direction: typeof map[number],
) {
    return (
        direction === axis ||
        (direction === 'x' && ['left', 'right'].includes(axis)) ||
        (direction === 'y' && ['top', 'bottom'].includes(axis))
    );
}

const dimensions: FunctionsObject = {
    opposite(direction, prefix) {
        const index = getIndex(direction);
        const result = index + (index % 2 === 0 ? 1 : -1);
        return `${prefix}-${map[result]}`;
    },

    only(direction: typeof map[number], value, elseValue) {
        return directions
            .map(item => (inAxis(item, direction) ? value : elseValue))
            .join(' ');
    },
};

export default dimensions;
