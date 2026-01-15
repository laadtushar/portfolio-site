import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SceneName } from '../../src/SceneController';
import { authorizedSanityExperimentalTypesafeClient } from '../../src/sanity/sanityClient';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  scene: SceneName;
}

export const getStaticProps:GetStaticProps<Props, Params> = async (context) => {
  const projects = await authorizedSanityExperimentalTypesafeClient.getAll('project');
  const posts = await authorizedSanityExperimentalTypesafeClient.getAll('post');
  const { slug } = context.params ?? { slug: 'error' };

  return {
    props: {
      projects,
      posts,
      scene: 'blog-open',
      slug,
    },
  };
};

export const getStaticPaths:GetStaticPaths = async () => {
  const posts = await authorizedSanityExperimentalTypesafeClient.getAll('post');
  const paths = posts?.map((post) => ({
    params: { slug: post?.slug?.current ?? 'error' },
  })) ?? [];

  return {
    paths,
    fallback: false,
  };
};

type BlogPostProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogPost: NextPage<BlogPostProps> = () => (null);

export default BlogPost;
