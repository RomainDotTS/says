import { useState, useEffect } from 'react';
import FlexSearch, {type Index} from 'flexsearch';
import type { ArticleMetadata } from './PostContainer';

export default function SearchBar({searchIn, resultCallback}: {searchIn: Record<string, ArticleMetadata>, resultCallback: React.Dispatch<React.SetStateAction<Record<string, ArticleMetadata>>>}) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Index | null>(null);

  useEffect(() => {
    const idx = new FlexSearch.Index({
      tokenize: 'bidirectional',
    });

    Object.values(searchIn).forEach(data => {
      idx.add(data.linkedTo, `${data.title} ${data.description}`);
    });

    setIndex(idx);
  }, [searchIn]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (index && value) {
      const res = index.search(value);
      const filteredResults = Object.fromEntries(Object.entries(searchIn).filter(([_, data]) => res.includes(data.linkedTo)));
      resultCallback(filteredResults);
    } else {
      resultCallback(searchIn);
    }
  };

  return (
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        style={{ width: '100%', padding: '8px' }}
        className='searchbar'
      />
  );
};