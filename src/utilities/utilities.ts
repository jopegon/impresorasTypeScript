import os from "node:os";
import { port } from "..";

// Función auxiliar para validar el formato de una IP
export const isValidIp = (ip: string): boolean => {
  const ipPart = '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])';
  const ipRegex = new RegExp(`^${ipPart}(\\.${ipPart}){3}$`);
  return ipRegex.test(ip);
};

export const getPort = (): number => {
    
    return port;
}

export const getLocalIP = (): string | undefined => {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
        const iface = interfaces[name];

        if (!iface) continue;

        for (const alias of iface) {
            // Ignorar direcciones internas (ej. 127.0.0.1) y solo IPv4
            if (alias.family === "IPv4" && !alias.internal) {
                return alias.address;
            }
        }
    }
    return undefined;
};

export const getAddressWithPort = (): string => {
    return `http://${getLocalIP()}:${getPort()}`;
}