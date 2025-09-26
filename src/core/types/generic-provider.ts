import { ClassProvider } from "@nestjs/common";

/**
 * Cria um provider genérico que conecta uma interface abstrata a uma implementação concreta
 * @param token - Token/interface abstrata (ex: IGenericRepository)
 * @param implementation - Classe concreta que implementa a interface
 * @returns Provider configurado para injeção de dependência
 */

export function createGenericProvider<T>(
  token: new (...args: any[]) => T,
  implementation: new (...args: any[]) => T
): ClassProvider<T> {
  return {
    provide: token,
    useClass: implementation,
  };
}
