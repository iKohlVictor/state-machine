import { ClassProvider } from "@nestjs/common";

export type PaginatedData<T> = {
  total: number;
  data: T[];
};

export abstract class IGenericRepository<T> {
  abstract getById(id: unknown): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract getPaginatedItems(
    page: number,
    limit: number
  ): Promise<PaginatedData<T>>;
  abstract create(item: T): Promise<T>;
  abstract update(id: unknown, item: T): void;
}
