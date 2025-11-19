import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/index';
import { products } from './products.schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('DRIZZLE') private readonly drizzle: NodePgDatabase<typeof schema>,
  ) { }

  /**
   * Zwraca wszystkie produkty z unified table
   * Każdy produkt zawiera: component_type, component_id i wspólne dane
   */
  async findAll() {
    return this.drizzle.select().from(products);
  }

  /**
   * Zwraca produkt z dodatkowymi szczegółami z odpowiedniej tabeli komponentu
   */
  async findOne(id: string) {
    const product = await this.drizzle.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Pobierz szczegółowe dane z tabeli komponentu
    const componentDetails = await this.getComponentDetails(
      product.componentType,
      product.componentId
    );

    return {
      ...product,
      componentDetails,
    };
  }

  /**
   * Pobiera szczegóły komponentu z odpowiedniej tabeli
   */
  private async getComponentDetails(componentType: string, componentId: string) {
    const tableMap: Record<string, string> = {
      cpu: 'cpus',
      gpu: 'gpus',
      ram: 'rams',
      ssd: 'ssds',
      hdd: 'hdds',
      motherboard: 'motherboards',
      psu: 'psus',
      cpu_cooler: 'cpu_coolers',
      monitor: 'monitors',
      case: 'cases',
    };

    const tableName = tableMap[componentType];
    if (!tableName) {
      return null;
    }

    // Wykonaj zapytanie do odpowiedniej tabeli komponentu
    const result = await this.drizzle.execute(sql`
      SELECT * FROM ${sql.identifier(tableName)}
      WHERE id = ${componentId}
    `);

    return result.rows[0] || null;
  }

  /**
   * Filtrowanie produktów po typie komponentu
   */
  async findByComponentType(componentType: string) {
    return this.drizzle
      .select()
      .from(products)
      .where(eq(products.componentType, componentType));
  }

  /**
   * Filtrowanie produktów po kategorii
   */
  async findByCategory(categoryId: string) {
    return this.drizzle
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
  }

  async create(data: any) {
    const [product] = await this.drizzle
      .insert(products)
      .values(data)
      .returning();
    return product;
  }

  async update(id: string, data: any) {
    const [product] = await this.drizzle
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const [product] = await this.drizzle
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
