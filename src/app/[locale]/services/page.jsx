"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Importar tu carrusel personalizado

const posts = [
  {
    id: 1,
    imageUrl: "/projects/Build1/image1.jpg",
    alt: "Image 1",
    project: "Build1",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build1.",
  },
  {
    id: 2,
    imageUrl: "/projects/Build2/image1.jpg",
    alt: "Image 2",
    project: "Build2",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build2.",
  },
  {
    id: 3,
    imageUrl: "/projects/Build3/image1.jpg",
    alt: "Image 3",
    project: "Build3",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build3.",
  },
  {
    id: 4,
    imageUrl: "/projects/Design1/image1.jpg",
    alt: "Image 4",
    project: "Design1",
    tags: ['remodeling', 'interior design'],
    description: "Descripción del proyecto Design1.",
  },
  {
    id: 5,
    imageUrl: "/projects/Design2/image1.jpg",
    alt: "Image 5",
    project: "Design2",
    tags: ['remodeling', 'interior design'],
    description: "Descripción del proyecto Design2.",
  },
];

const Services = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectImages, setProjectImages] = useState([]);

  // Cargar el JSON de proyectos
  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => {
        setProjectImages(data);
      })
      .catch((error) => {
        console.error('Error al cargar el JSON de proyectos:', error);
      });
  }, []);

  // Extraer todos los tags únicos de los posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Filtrar los posts según el tag seleccionado
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  // Manejar el clic en una imagen
  const handleImageClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  // Cerrar el modal al hacer clic fuera
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  // Cerrar el modal al presionar la tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

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
          <div
            key={post.id}
            className="post cursor-pointer"
            onClick={() => handleImageClick(post.project)}
          >
            <img
              src={post.imageUrl}
              alt={post.alt}
              className="xl:w-[800px] xl:h-[500px] max-w-full h-[300px] mx-auto"
            />
          </div>
        ))}
      </div>

      {/* Modal para mostrar las imágenes del proyecto */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={handleBackdropClick} // Cerrar el modal al hacer clic fuera
        >
          <div
            className="bg-white rounded-lg  max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro del modal cierre el modal
          >
            <h2 className="text-xl font-bold mb-4">Project: {selectedProject}</h2>
            <p className="mb-4">{posts.find((post) => post.project === selectedProject)?.description}</p>

            {/* Carrusel de imágenes */}
            <Carousel
              opts={{ loop: true, dragFree: true }} // Desplazamiento manual
              className="xl:w-[1200px] xl:h-[700px] max-w-full h-[300px] mx-auto"
            >
              <CarouselContent className="flex">
                {projectImages[selectedProject]?.map((image, index) => (
                  <CarouselItem key={index}> 
                    <div className="w-full h-full">
                      <div className="w-full h-full overflow-hidden">
                        <div className="flex justify-center items-center w-full h-full">
                          <div className="w-full h-full relative">
                            <img
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-4 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;

/*
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Importar tu carrusel personalizado

const posts = [
  {
    id: 1,
    imageUrl: "/projects/Build1/image1.jpg",
    alt: "Image 1",
    project: "Build1",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build1.",
  },
  {
    id: 2,
    imageUrl: "/projects/Build2/image1.jpg",
    alt: "Image 2",
    project: "Build2",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build2.",
  },
  {
    id: 3,
    imageUrl: "/projects/Build3/image1.jpg",
    alt: "Image 3",
    project: "Build3",
    tags: ['build', 'remodeling'],
    description: "Descripción del proyecto Build3.",
  },
  {
    id: 4,
    imageUrl: "/projects/Design1/image1.jpg",
    alt: "Image 4",
    project: "Design1",
    tags: ['remodeling', 'interior design'],
    description: "Descripción del proyecto Design1.",
  },
  {
    id: 5,
    imageUrl: "/projects/Design2/image1.jpg",
    alt: "Image 5",
    project: "Design2",
    tags: ['remodeling', 'interior design'],
    description: "Descripción del proyecto Design2.",
  },
];

const Services = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectImages, setProjectImages] = useState([]);

  // Cargar el JSON de proyectos
  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => {
        setProjectImages(data);
      })
      .catch((error) => {
        console.error('Error al cargar el JSON de proyectos:', error);
      });
  }, []);

  // Extraer todos los tags únicos de los posts
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Filtrar los posts según el tag seleccionado
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  // Manejar el clic en una imagen
  const handleImageClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  // Cerrar el modal al hacer clic fuera
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  // Cerrar el modal al presionar la tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="p-4">
      <div className="flex flex-col mb-4 justify-center items-center">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Botón "All" */}
          /*
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
          /*

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
      /*
      <div className="grid grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="post cursor-pointer"
            onClick={() => handleImageClick(post.project)}
          >
            <img
              src={post.imageUrl}
              alt={post.alt}
              className="xl:w-[800px] xl:h-[500px] max-w-full h-[300px] mx-auto"
            />
          </div>
        ))}
      </div>

      {/* Modal para mostrar las imágenes del proyecto */}/*
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={handleBackdropClick} // Cerrar el modal al hacer clic fuera
        >
          <div
            className="bg-white rounded-lg  max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro del modal cierre el modal
          >
            <h2 className="text-xl font-bold mb-4">Project: {selectedProject}</h2>
            <p className="mb-4">{posts.find((post) => post.project === selectedProject)?.description}</p>

            {/* Carrusel de imágenes */}/*
            <Carousel
              opts={{ loop: true, dragFree: true }} // Desplazamiento manual
              className="xl:w-[1200px] xl:h-[700px] max-w-full h-[300px] mx-auto"
            >
              <CarouselContent className="flex">
                {projectImages[selectedProject]?.map((image, index) => (
                  <CarouselItem key={index}> 
                    <div className="w-full h-full">
                      <div className="w-full h-full overflow-hidden">
                        <div className="flex justify-center items-center w-full h-full">
                          <div className="w-full h-full relative">
                            <img
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-4 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;

*/