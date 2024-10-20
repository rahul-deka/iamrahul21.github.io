import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredElement, setHoveredElement] = useState('');

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className={`custom-cursor ${hoveredElement}`}
            style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
            }}
        />
    );
};

export default CustomCursor;