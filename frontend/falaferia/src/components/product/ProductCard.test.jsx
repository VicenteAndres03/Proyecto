import {render, screen, fireEvent} from "@testing-library/react";
import {describe, it, expect, vi} from 'vitest';
import ProductCard from './ProductCard';
import React from "react";

vi.mock('bootstrap', () => {
    return {
        Carousel: class{
            constructor(){}
        }
    };
});

//Datos de prueba falsos

const prPrueba = {
    id: 1,
    name: "Polera Test",
    brand: "Marca Test",
    price: 15000,
    images: ["img1.jpg", "img2.jpg"],
    seller: "Tienda Oficial"
};

describe('Componente ProductCard', () =>{
    it('renderizar el producto', () => {
        render(<ProductCard product={prPrueba} onAddToCart={() => {}}/>);
        expect(screen.getByText("Polera Test")).toBeInTheDocument();
        expect(screen.getByText(/15.000/)).toBeInTheDocument();
        expect(screen.getByText("Marca Test")).toBeInTheDocument();
    });
    
    //simulacion cuando se hace click al agregar carrito
    it('simular agregar al carrito', () =>{
        const fnEspia = vi.fn();
        render(<ProductCard product={prPrueba} onAddToCart={fnEspia}/>);
        const boton = screen.getByRole('button', {name: /Añadir al carrito/i});
        fireEvent.click(boton);

        expect(fnEspia).toHaveBeenCalledTimes(1);
        expect(fnEspia).toHaveBeenCalledWith(prPrueba);
    });

    it('Si no tiene imagenes', () => {
        const productosinfoto = { ...prPrueba, images: []};
        render(<ProductCard product={productosinfoto} onAddToCart={() => {}}/>);
        expect(screen.getByText('Imagen no disponible')).toBeInTheDocument();
    })
});
