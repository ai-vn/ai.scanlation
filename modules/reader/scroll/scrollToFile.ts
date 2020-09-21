import { Ref } from '@nuxtjs/composition-api';

export const scrollToFile = (images: Ref<HTMLElement>) => (index: number) => {
    const child = images.value.children[index];
    if (!(child instanceof HTMLElement)) return;

    images.value.scrollTo({
        top: child.offsetTop,
        behavior: 'smooth',
    });
};
