import type { InferGetStaticPropsType, NextPage } from 'next';
import { SceneName } from '../../src/SceneController';
import { authorizedSanityExperimentalTypesafeClient } from '../../src/sanity/sanityClient';

export async function getStaticProps() {
  const projects = await authorizedSanityExperimentalTypesafeClient.getAll('project');
  const posts = await authorizedSanityExperimentalTypesafeClient.getAll('post');
  const scene:SceneName = 'blog';

  return {
    props: {
      projects,
      posts,
      scene,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const BlogIndex: NextPage<Props> = () => (null);

export default BlogIndex;
