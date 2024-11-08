import ReactPDF from '@react-pdf/renderer';
import { HapMapPdf } from '../components/PDF/HapMapPdf';
import type { APIRoute } from 'astro';
import React from 'react';

export const GET: APIRoute = async ({ props }) => {
    const file = await ReactPDF.renderToStream(React.createElement(HapMapPdf));
    return new Response(file, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
        },
    });
};
