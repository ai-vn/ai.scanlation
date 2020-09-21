import { each, clamp } from 'lodash';
import { reader } from '~/store';

export const onReaderScroll = ({ target }: Event | { target: HTMLElement }) => {
    if (!(target instanceof HTMLElement)) return;

    const scroller = target.getBoundingClientRect();
    each(target.children, (image, index) => {
        const { top, height } = image.getBoundingClientRect();
        const calcLine = (line: number) =>
            Math.round(clamp((line - top) / height, 0, 1) * 100);

        reader.updateFile({
            file: reader.files[index],
            data: {
                scroll: {
                    top: calcLine(scroller.top),
                    bottom: calcLine(scroller.bottom),
                },
            },
        });
    });
};
