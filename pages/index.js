// pages/index.js

import Link from 'next/link';
import Head from 'next/head';

// Esta función se ejecuta solo en el servidor para obtener todos los datos
export async function getServerSideProps() {
    const { getAllDrawings } = require('../db.js');
    const allDrawings = getAllDrawings();

    return {
        props: {
            drawings: allDrawings,
        },
    };
}

export default function HomePage({ drawings }) {

    // Función para manejar la eliminación de un dibujo
    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este dibujo?')) {
            await fetch('/api/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            // Recargamos la página para ver los cambios
            window.location.reload();
        }
    };

    return (
        <>
            <Head>
                <title>Mis Dibujos Mágicos</title>
            </Head>
            <main className="container">
                <h1>Mis Dibujos Mágicos</h1>
                <p>
                    <Link href="/add">
                        <button>➕ Agregar nuevo dibujo</button>
                    </Link>
                </p>
                <hr />
                
                {drawings.length > 0 ? (
                    <div className="masonry-gallery">
                        {drawings.map((drawing) => (
                            <div key={drawing.id} className="gallery-item">
                                <p className="item-title">{drawing.title}</p>
                                {drawing.image_path && (
                                    <img
                                        src={drawing.image_path}
                                        alt={drawing.title}
                                    />
                                )}
                                <div className="item-buttons">
                                   
                                    <button onClick={() => handleDelete(drawing.id)} className="delete-button">
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron dibujos.</p>
                )}
            </main>
        </>
    );
}