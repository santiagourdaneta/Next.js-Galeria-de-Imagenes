// pages/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditDrawingPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  // Efecto para obtener los datos del dibujo cuando la página carga
  useEffect(() => {
    if (isEditing) {
      const fetchDrawing = async () => {
        const res = await fetch(`/api/drawing?id=${id}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setCurrentImage(data.image_path);
      };
      fetchDrawing();
    }
  }, [id, isEditing]);

  // Función que se ejecuta cuando el formulario es enviado
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const endpoint = `/api/edit?id=${id}`;
    const res = await fetch(endpoint, {
      method: 'POST', // Usamos POST para enviar FormData
      body: formData,
    });

    if (res.ok) {
      router.push('/');
    } else {
        const errorData = await res.json();
        alert(errorData.message);
    }
  };

  return (
    <main className="container">
      <h1>{isEditing ? 'Editar Dibujo' : 'Agregar Nuevo Dibujo'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <label htmlFor="image">Foto</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {currentImage && (
            <div style={{ marginTop: '1rem' }}>
                <p>Imagen actual:</p>
                <img src={currentImage} alt="current" style={{ maxWidth: '200px', borderRadius: '8px' }} />
            </div>
        )}
        
        <button type="submit">{isEditing ? 'Guardar Cambios' : 'Agregar Dibujo'}</button>
      </form>
    </main>
  );
}