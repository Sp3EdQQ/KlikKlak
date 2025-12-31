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
   * Zwraca wszystkie produkty z unified table z paginacją
   * Każdy produkt zawiera: component_type, component_id i wspólne dane
   */
  async findAll(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    
    const [items, countResult] = await Promise.all([
      this.drizzle
        .select()
        .from(products)
        .limit(limit)
        .offset(offset),
      this.drizzle
        .select({ count: sql<number>`count(*)::int` })
        .from(products)
    ]);

    const total = countResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Zwraca produkt z dodatkowymi szczegółami z odpowiedniej tabeli komponentu
   * Obsługuje zarówno UUID jak i slug
   */
  async findOne(idOrSlug: string) {
    // Sprawdź, czy przekazano UUID czy slug
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    const product = await this.drizzle.query.products.findFirst({
      where: isUuid 
        ? eq(products.id, idOrSlug)
        : eq(products.slug, idOrSlug),
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
   * Filtrowanie produktów po typie komponentu z paginacją
   */
  async findByComponentType(componentType: string, page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    
    const [items, countResult] = await Promise.all([
      this.drizzle
        .select()
        .from(products)
        .where(eq(products.componentType, componentType))
        .limit(limit)
        .offset(offset),
      this.drizzle
        .select({ count: sql<number>`count(*)::int` })
        .from(products)
        .where(eq(products.componentType, componentType))
    ]);

    const total = countResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Filtrowanie produktów po kategorii z paginacją
   */
  async findByCategory(categoryId: string, page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;
    
    const [items, countResult] = await Promise.all([
      this.drizzle
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId))
        .limit(limit)
        .offset(offset),
      this.drizzle
        .select({ count: sql<number>`count(*)::int` })
        .from(products)
        .where(eq(products.categoryId, categoryId))
    ]);

    const total = countResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Zwraca losowe produkty
   */
  async findRandom(limit: number = 8) {
    const items = await this.drizzle
      .select()
      .from(products)
      .orderBy(sql`RANDOM()`)
      .limit(limit);

    return items;
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
