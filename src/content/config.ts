import { defineCollection } from 'astro:content';

const maps = defineCollection({
    type: 'data'
})

const people = defineCollection({
    type: 'content'
})

const stories = defineCollection({
    type: 'content'
})

const facets = defineCollection({
    type: 'data'
})

export const collections = {
    'maps': maps,
    'people': people,
    'stores': stories,
    'facets': facets
}