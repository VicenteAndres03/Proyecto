import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { describe, it, expect } from 'vitest';
import React from 'react';

// Simulacion basica del header
describe('Componentes del header', () => {
    it('Nombre de la tienda Falaferia visible', () => {
        //renderizare
        render(
            <BrowserRouter>
            <Header cartCount={0}/>
            </BrowserRouter>
        );

        //texto falaferia

        const titulo = screen.getByText(/FalaFeria/i);

        //buscar en el documento
        expect(titulo).toBeInTheDocument();
    });

    it('Carrito si hay productos', () => {
        render(
            <BrowserRouter>
            <Header cartCount={5}/>
            </BrowserRouter>
        );

        const contador = screen.getByText('5');

        expect(contador).toBeInTheDocument();
    })
})