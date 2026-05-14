import PostsContainer from './PostContainer';
import type { ArticleMetadata } from './PostContainer';
import SearchBar from './SearchBar';
import { useState } from 'react';

const metadataArticles: Record<string, ArticleMetadata> = import.meta.glob('../posts/*.mdx', { eager: true, import: 'metadata' })

export default function Posts() {
  const [filteredArticles, setFilteredArticles] = useState<Record<string, ArticleMetadata>>(metadataArticles);
  
  return (
    <div>
      <SearchBar searchIn={metadataArticles} resultCallback={setFilteredArticles} />
      <div className="flexbox articlesList">
        {Object.values(filteredArticles).map((article) => <PostsContainer key={article.linkedTo} title={article.title} description={article.description} date={article.date} linkedTo={article.linkedTo} />)}
      </div>
    </div>
  )
}