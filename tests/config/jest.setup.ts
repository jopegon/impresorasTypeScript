// config/jest.setup.js

// Mock defensivo para evitar que Jest intente cargar el JS ESM de ConsultaImpresora
jest.mock('../../src/services/ConsultaImpresora', () => {
  // devolver un mock que tenga la misma "forma" (API) que la clase real
  return {
    ConsultaImpresora: class {
      private impresora: any;
      constructor(impresora?: any) { this.impresora = impresora; }
      setTimeout(/*ms: number*/): void { /* noop */ }
      async obtenerDatosImpresora(): Promise<any> {
        // devuelve un objeto similar al que esperas o lanza para simular fallo
        return Promise.resolve(this.impresora ?? {
          ip: '127.0.0.1',
          conectada: true,
          numeroDeSerie: 'SN123',
          modelo: 'MOCK',
          contador: 0,
          negro: 100,
          cyan: 100,
          amarillo: 100,
          magenta: 100
        });
      }
    }
  };
});

// Evita que Jest cargue módulos pesados o que inicien el servidor
jest.mock('../../src/index', () => ({}));
jest.mock('../../src/server/server', () => ({
  Server: class {
    listen() { }
    close() { }
  }
}));

// Nota: He eliminado la duplicación del mock de ConsultaImpresora.

// Si quieres exportar utilidades o configuraciones para que
// estén disponibles en tus tests, podrías hacerlo aquí,
// pero para los "jest.mock" solo necesitas que el archivo se ejecute.