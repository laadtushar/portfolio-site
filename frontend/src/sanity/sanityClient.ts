// import fetch from 'node-fetch';
import { createClient as createExperimentalTypesafeClient } from 'sanity-codegen';
import createClient from '@sanity/client';
// eslint-disable-next-line import/no-relative-packages
import { Documents } from '../../generatedSanitySchemaTypes';

const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? 'production',
  previewMode: false,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-05-03',
};

const authorizedClientConfig = {
  ...clientConfig,
  token: process.env.SANITY_API_TOKEN ?? process.env.SANITY_TOKEN ?? '',
};

export const authorizedSanityClient = createClient(authorizedClientConfig);
export const safeSanityClient = createClient(clientConfig);

// @ts-ignore
// eslint-disable-next-line max-len
export const authorizedSanityExperimentalTypesafeClient = createExperimentalTypesafeClient<Documents>({
  ...authorizedClientConfig,
  // @ts-ignore
  fetch,
});
