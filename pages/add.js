// pages/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddDrawingPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the magic sack
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    const res = await fetch('/api/add', {
        method: 'POST',
        body: formData, // Send the magic sack
    });

    const data = await res.json();
    if (data.success) {
        router.push('/'); // Go back to the main page
    }
};

  return (
    <main className="container">
      <h1>Add a New Drawing</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="image">Picture</label>
        <input
            type="file"
            id="image"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
        />
        <button type="submit">Add Drawing</button>
      </form>
    </main>
  );
}