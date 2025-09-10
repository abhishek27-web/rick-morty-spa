import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacter } from '../api/rickAndMortyApi';

export function CharacterDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading character details...</div>;
  }

  if (isError) {
    return <div>Error loading character: {error?.message || 'Unknown error'}</div>;
  }

  if (!data) {
    return <div>No character found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        ← Back to Characters
      </Link>
      <div style={{ marginTop: '20px' }}>
        <h2>{data.name}</h2>
        <img src={data.image} alt={data.name} style={{ width: '200px', height: '200px' }} />
        <div style={{ marginTop: '10px' }}>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Species:</strong> {data.species}</p>
          <p><strong>Gender:</strong> {data.gender}</p>
          <p><strong>Origin:</strong> {data.origin.name}</p>
          <p><strong>Location:</strong> {data.location.name}</p>
        </div>
      </div>
    </div>
  );
}
