import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine';

// Crea una instancia del motor SSR de Angular
const commonEngine = new CommonEngine();

/**
 * Manejador (handler) que usa Netlify para renderizar SSR.
 * No usa Express, solo Request y Response nativos.
 */
export default async function handler(request: Request, context: any): Promise<Response> {
  return render(commonEngine, request, context);
}
