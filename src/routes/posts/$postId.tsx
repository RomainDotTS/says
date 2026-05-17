import { createFileRoute, notFound } from '@tanstack/react-router'

type MdxModule = {
  default: React.ComponentType
}

const articleModules = import.meta.glob<MdxModule>(
  '../../posts/*.mdx',
  { eager: true }
)

function getArticlePath(postId: string) {
  return `../../posts/${postId}.mdx`
}

function getArticleModule(postId: string): MdxModule | undefined {
  return articleModules[getArticlePath(postId)]
}


export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => {
    if (!getArticleModule(params.postId)) throw notFound()
    return { postId: params.postId }
  },
  component: RouteComponent,
})


function RouteComponent() {
  const { postId } = Route.useLoaderData()
  const Content = getArticleModule(postId)?.default

  if (!Content) {
    return notFound()
  }

  return <Content />
}