import {
  createClient,
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
  createPortableTextComponent,
} from "next-sanity";

const config = {
    projectId: "af9rpnm9",
    dataset: "production",
    apiVersion: '2021-06-07',
    useCdn: false
}

export const sanityClient = createClient(config)

export const usePreviewSuscription = createPreviewSubscriptionHook(config)

export const urlFor = source => createImageUrlBuilder(config).image(source)

export const PortableText = createPortableTextComponent({
    ...config,
    serializers:{}
})