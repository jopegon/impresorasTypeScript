// tests/config/jest.setup.ts

// Mock defensivo para evitar que Jest intente cargar el JS ESM de ConsultaImpresora
jest.mock('../../src/services/ConsultaImpresora', () => {
  // Define una interfaz mínima para la impresora (opcional, ayuda con autocompletado)
  interface ImpresoraMock {
    ip?: string;
    conectada?: boolean;
    numeroDeSerie?: string;
    modelo?: string;
    contador?: number;
    negro?: number;
    cyan?: number;
    amarillo?: number;
    magenta?: number;
    [key: string]: any;
  }

  return {
    ConsultaImpresora: class {
      // declara la propiedad con un tipo explícito
      impresora: ImpresoraMock | undefined;

      constructor(impresora: ImpresoraMock | undefined) {
        this.impresora = impresora;
      }

      // simulación de setTimeout (noop)
      setTimeout(/* ms?: number */): void {
        // noop
      }

      // simulación de obtenerDatosImpresora: devuelve la impresora mock o un objeto por defecto
      async obtenerDatosImpresora(): Promise<ImpresoraMock> {
        return Promise.resolve(
          this.impresora ?? {
            ip: '127.0.0.1',
            conectada: true,
            numeroDeSerie: 'SN123',
            modelo: 'MOCK',
            contador: 0,
            negro: 100,
            cyan: 100,
            amarillo: 100,
            magenta: 100
          }
        );
      }
    }
  };
});

// Evita que Jest cargue módulos pesados o que inicien el servidor
jest.mock('../../src/index', () => ({}));

jest.mock('../../src/server/server', () => ({
  Server: class {
    listen(): void {
      /* noop */
    }
    close(): void {
      /* noop */
    }
  }
}));

// Si alguna vez quieres exponer utilidades globales para los tests:
// (por ejemplo) globalThis.__MI_UTIL__ = ...
