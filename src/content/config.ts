import { z, defineCollection } from 'astro:content';

const maps = defineCollection({
    type: 'data',
    schema: z.object({
        argoMetadata: z.object({}),
        dcMetadata: z.object({
            id: z.string(),
            system_create_dtsi: z.string().datetime(),
            system_modified_dtsi: z.string().datetime(),
            curator_model_ssi: z.string(),
            curator_model_suffix_ssi: z.string(),
            title_info_primary_tsi: z.string(),
            genre_basic_ssim: z.array(z.string()),
            date_tsim: z.array(z.string()),
            date_type_ssm: z.array(z.string()),
            date_edtf_ssm: z.array(z.string()),
            date_start_dtsi: z.string().datetime(),
            date_end_dtsi: z.string().datetime(),
            related_item_host_ssim: z.array(z.string()),
            related_item_isreferencedby_ssm: z.array(z.string()).optional(),
            subject_topic_tsim: z.array(z.string()).optional(),
            subject_facet_ssim: z.array(z.string()).optional(),
            subject_name_tsim: z.array(z.string()).optional(),
            subject_geo_other_ssm: z.array(z.string()).optional(),
            physical_location_ssim: z.array(z.string()),
            sub_location_tsi: z.string().optional(),
            identifier_uri_ss: z.string().url(),
            identifier_local_other_tsim: z.array(z.string()).optional(),
            identifier_local_call_tsim: z.array(z.string()).optional(),
            identifier_local_barcode_tsim: z.array(z.string()).optional(),
            note_tsim: z.array(z.string()).optional(),
            scale_tsim: z.array(z.string()).optional(),
            rights_ss: z.string(),
            license_ss: z.string(),
            reuse_allowed_ssi: z.string(),
            digital_origin_ssi: z.string(),
            extent_tsi: z.string().optional(),
            resource_type_manuscript_bsi: z.boolean(),
            type_of_resource_ssim: z.array(z.string()),
            lang_term_ssim: z.array(z.string()).optional(),
            publishing_state_ssi: z.string(),
            processing_state_ssi: z.string(),
            destination_site_ssim: z.array(z.string()),
            hosting_status_ssi: z.string(),
            harvesting_status_bsi: z.boolean(),
            exemplary_image_ssi: z.string(),
            exemplary_image_key_base_ss: z.string(),
            admin_set_name_ssi: z.string(),
            admin_set_ark_id_ssi: z.string(),
            institution_name_ssi: z.string(),
            institution_ark_id_ssi: z.string(),
            collection_name_ssim: z.array(z.string()),
            collection_ark_id_ssim: z.array(z.string()),
            filenames_ssim: z.array(z.string()),
            mods_xml_ss: z.string(),
            _version_: z.number(),
            timestamp: z.string().datetime(),
            subject_geographic_sim: z.array(z.string()).optional(),
            date_facet_yearly_itim: z.array(z.number()),
            score: z.number(),
            identifier_iiif_manifest_ss: z.string().optional(),
            name_tsim: z.array(z.string()).optional(),
            name_role_tsim: z.array(z.string()).optional(),
        }),
    }),
})

const people = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        bio_dates: z.string(),
        short_description: z.string(),
        credit: z.string(),
        banner_image: z.string().url(),
        tags: z.array(z.string()),
        related_maps: z.array(z.string()),
    }),
});

const stories = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        short_description: z.string(),
        banner_image: z.string().url(),
        author: z.string(),
        publish_date: z.date(),
        story_type: z.string().optional()
    }),
});

const facets = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        short_description: z.string(),
        banner_image: z.string().url(),
        'facet-categories': z.array(z.object({
            id: z.string(),
            title: z.string(),
            entries: z.array(z.string()),
            banner_image: z.string().optional()
        })),
    }),
})

const partnerCollections = defineCollection({
    type: 'data'
})

export const collections = {
    'maps': maps,
    'people': people,
    'stories': stories,
    'facets': facets,
    'partner-collections': partnerCollections
}