import { defineCollection } from 'astro:content';

const maps = defineCollection({
    type: 'data'
})

export const collections = {
    'maps': maps
}