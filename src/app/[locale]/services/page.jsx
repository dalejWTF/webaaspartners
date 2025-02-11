"use client";

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

const posts = [
  {
    id: 1,
    imageUrl: "/assets/images/1.jpg",
    alt: "Image 1",
    tags: ['build', 'remodeling'],
  },
  {
    id: 2,
    imageUrl: "/assets/images/2.jpg",
    alt: "Image 2",
    tags: ['build', 'remodeling'],
  },
  {
    id: 3,
    imageUrl: "/assets/images/3.jpg",
    alt: "Image 3",
    tags: ['build', 'remodeling'],
  },
  {
    id: 4,
    imageUrl: "/assets/images/4.jpg",
    alt: "Image 4",
    tags: ['remodeling', 'interior design'],
  },
  {
    id: 5,
    imageUrl: "/assets/images/5.jpg",
    alt: "Image 5",
    tags: ['remodeling', 'interior design'],
  },
];

const Services = () => {
  const [selectedTag, setSelectedTag] = useState('');

  // Extraer todos los tags únicos de los posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Filtrar los posts según el tag seleccionado
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="p-4">
      <div className="flex flex-col mb-4 justify-center items-center">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Botón "All" */}
          <Button
            variant="outline"
            className={`w-full h-auto rounded ${
              selectedTag === '' ? 'text-white bg-primary border-b-2 border-accent' : ''
            }`}
            onClick={() => setSelectedTag('')}
          >
            All
          </Button>

          {/* Botones dinámicos para cada tag */}
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className={`w-full h-auto rounded ${
                selectedTag === tag ? 'text-white bg-primary border-b-2 border-accent' : ''
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de posts filtrados */}
      <div className="grid grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post">
            <img
              src={post.imageUrl}
              alt={post.alt}
              className="xl:w-[800px] xl:h-[500px] max-w-full h-[300px] mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;