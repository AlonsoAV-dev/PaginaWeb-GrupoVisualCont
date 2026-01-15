import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await removeAuthCookie();
    
    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada correctamente',
    });
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
