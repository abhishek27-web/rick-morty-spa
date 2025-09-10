import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../api/rickAndMortyApi';
import { CharacterTable } from '../components/CharacterTable';

export default function CharacterListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const page = Number(searchParams.get('page')) || 1;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
  });

  const goToPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rick & Morty Characters</h1>
      <button onClick={() => refetch()} style={{ marginBottom: '20px' }}>
        Refresh
      </button>
      
      <CharacterTable data={data.results} />
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          disabled={page <= 1} 
          onClick={() => goToPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {data.info.pages}</span>
        <button 
          disabled={!data.info.next} 
          onClick={() => goToPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
