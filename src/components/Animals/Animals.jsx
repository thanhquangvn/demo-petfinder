import React, { useEffect, useState } from 'react';
import './Animals.css';

export default function Dashboard({ accessToken }) {
  const [results, setResults] = useState(null);
  useEffect(() => {
    if (accessToken === null) return;
    const fetchPets = async () => {
      const petResults = await fetch('https://api.petfinder.com/v2/animals', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJSON = await petResults.json();
      setResults(responseJSON.animals);
    };
    fetchPets();
  }, [accessToken]);

  if (results === null) return null;
  return (
    <>
      <div className='header'>
        <a href='#default'>PET FINDER</a>
      </div>
      <div id='wrapper'>
        <h2>List Pet Finder Animals</h2>
        <div className='grid-container'>
          {results.map((result) => (
            <div className='grid-item' key={result.id}>
              {result.primary_photo_cropped && (
                <img
                  src={`${result.primary_photo_cropped.small}`}
                  alt='animals'
                  width='125'
                  height='125'
                />
              )}
              <p>{result.name}</p>
              <p>{result.age}</p>
              <p>{result.breeds.primary}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
