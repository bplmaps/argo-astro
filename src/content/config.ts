import { defineCollection } from 'astro:content';

const maps = defineCollection({
    type: 'data'
})

const people = defineCollection({
    type: 'content'
})

export const collections = {
    'maps': maps,
    'people': people
}