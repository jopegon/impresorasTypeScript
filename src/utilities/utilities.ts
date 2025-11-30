// Función auxiliar para validar el formato de una IP
export const isValidIp = (ip: string): boolean => {
  const ipPart = '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])';
  const ipRegex = new RegExp(`^${ipPart}(\\.${ipPart}){3}$`);
  return ipRegex.test(ip);
};
