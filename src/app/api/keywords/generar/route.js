import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key de Groq no configurada' },
        { status: 500 }
      );
    }

        if (!titulo && !contenido) {
            return NextResponse.json(
                { error: 'Se requiere título o contenido' },
                { status: 400 }
            );
        }

        // Limpiar HTML del contenido
        const contenidoLimpio = contenido
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 2000);

        const prompt = `
        Eres un especialista senior en SEO para una empresa de software contable y laboral en Perú.

        Analiza el siguiente artículo y genera entre 5 y 8 keywords o frases clave optimizadas para SEO (intención de búsqueda en Google).

        CONTEXTO:
        - Público objetivo: responsables de RR.HH., contadores, payroll y abogados laboralistas.
        - Objetivo: atraer tráfico orgánico calificado para artículos legales y laborales.

        Título: ${titulo}
        Contenido: ${contenidoLimpio}

        REGLAS OBLIGATORIAS:
        1. Prioriza keywords con intención clara de búsqueda (problemas, soluciones, criterios legales).
        2. Usa preferentemente frases de 2 a 4 palabras (long-tail SEO).
        3. Incluye términos técnicos peruanos (SUNAT, PLAME, AFP, planilla electrónica, Código Civil, Casación Laboral, Corte Suprema, etc.) SOLO si aparecen en el contenido.
        4. Si se menciona una norma, sentencia o casación específica, inclúyela de forma precisa.
        5. Evita términos excesivamente genéricos o ambiguos.
        6. No inventes conceptos que no estén explícita o claramente implícitos en el texto.
        7. Prioriza términos aplicables como etiquetas SEO o metadatos.

        FORMATO DE RESPUESTA:
        Devuelve ÚNICAMENTE las keywords separadas por comas, sin numeración, sin comillas, sin explicaciones y sin punto final.

        Ejemplo de salida correcta:
        sobrepago a trabajadores, recuperar sobrepagos laborales, planilla electrónica, código civil pagos por error, casación laboral peruana
        `;

        console.log('Llamando a Groq API (Llama 3.3 70B)...');

        // Usar Groq con Llama 3.3 - 100% gratis
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: 'Eres un experto en SEO para empresas de software contable en Perú. Genera keywords relevantes.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 200,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error de Groq API:', response.status, errorData);
            throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('Respuesta recibida de Groq');

        const generatedText = data.choices?.[0]?.message?.content || '';
        console.log('Texto generado:', generatedText);

        // Limpiar y procesar keywords
        const keywords = generatedText
            .split(',')
            .map(k => k.trim())
            .filter(k => k.length > 0 && k.length < 50)
            .slice(0, 8);

        return NextResponse.json({
            success: true,
            keywords: keywords,
        });
    } catch (error) {
        console.error('Error detallado al generar keywords:');
        console.error('Mensaje:', error.message);
        console.error('Stack:', error.stack);

        return NextResponse.json(
            {
                error: 'Error al generar keywords. Intenta nuevamente.',
                details: error.message,
            },
            { status: 500 }
        );
    }
}
