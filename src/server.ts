import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

/**
 * Netlify SSR handler para Angular 19
 */
export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  // Ejemplo opcional: agregar endpoints API personalizados:
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hola desde la API' });
  // }

  // Renderiza la aplicación Angular SSR
  return await render(commonEngine);
}
