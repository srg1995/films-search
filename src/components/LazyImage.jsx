import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt, className }) {
    const [isVisible, setIsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
            {/* Imagen con blur hasta que cargue */}
            {isVisible && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition duration-500 ease-in-out ${
                        loaded ? "blur-0 scale-100" : "blur-md scale-105"
                    }`}
                    onLoad={() => setLoaded(true)}
                />
            )}

            {/* Placeholder de fondo (gris oscuro) */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
        </div>
    );
}

export default LazyImage;
