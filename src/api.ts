// LittleSis API client
import { 
  LittleSisApiResponse, 
  LittleSisErrorResponse,
  Entity, 
  Relationship, 
  Extension, 
  List,
  RelationshipWithEntities,
  EntitySearchParams,
  EntityRelationshipsParams,
  EntityConnectionsParams
} from './types.js';

const BASE_URL = 'https://littlesis.org/api';

class LittleSisApiError extends Error {
  constructor(public statusCode: number, public errors: Array<{title: string}>) {
    super(`LittleSis API Error (${statusCode}): ${errors.map(e => e.title).join(', ')}`);
    this.name = 'LittleSisApiError';
  }
}

async function makeApiRequest<T>(endpoint: string): Promise<LittleSisApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData: LittleSisErrorResponse = await response.json();
      throw new LittleSisApiError(response.status, errorData.errors);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof LittleSisApiError) {
      throw error;
    }
    throw new Error(`Failed to fetch from LittleSis API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export class LittleSisApi {
  // Entity endpoints
  static async getEntity(id: number): Promise<LittleSisApiResponse<Entity>> {
    return makeApiRequest<Entity>(`/entities/${id}`);
  }

  static async getEntities(ids: number[]): Promise<LittleSisApiResponse<Entity[]>> {
    if (ids.length > 300) {
      throw new Error('Maximum 300 entities per request');
    }
    return makeApiRequest<Entity[]>(`/entities?ids=${ids.join(',')}`);
  }

  static async searchEntities(params: EntitySearchParams): Promise<LittleSisApiResponse<Entity[]>> {
    const searchParams = new URLSearchParams();
    searchParams.append('q', params.q);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.regions) searchParams.append('regions', params.regions.toString());
    if (params.tags) searchParams.append('tags', params.tags);
    
    return makeApiRequest<Entity[]>(`/entities/search?${searchParams.toString()}`);
  }

  static async getEntityExtensions(id: number, details: boolean = false): Promise<LittleSisApiResponse<Extension[]>> {
    const detailsParam = details ? '?details=TRUE' : '';
    return makeApiRequest<Extension[]>(`/entities/${id}/extensions${detailsParam}`);
  }

  static async getEntityRelationships(id: number, params?: EntityRelationshipsParams): Promise<LittleSisApiResponse<Relationship[]>> {
    const searchParams = new URLSearchParams();
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const paramString = searchParams.toString();
    const endpoint = `/entities/${id}/relationships${paramString ? '?' + paramString : ''}`;
    return makeApiRequest<Relationship[]>(endpoint);
  }

  static async getEntityConnections(id: number, params?: EntityConnectionsParams): Promise<LittleSisApiResponse<Entity[]>> {
    const searchParams = new URLSearchParams();
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const paramString = searchParams.toString();
    const endpoint = `/entities/${id}/connections${paramString ? '?' + paramString : ''}`;
    return makeApiRequest<Entity[]>(endpoint);
  }

  static async getEntityLists(id: number): Promise<LittleSisApiResponse<List[]>> {
    return makeApiRequest<List[]>(`/entities/${id}/lists`);
  }

  // Relationship endpoints
  static async getRelationship(id: number): Promise<RelationshipWithEntities> {
    return makeApiRequest<Relationship>(`/relationships/${id}`) as Promise<RelationshipWithEntities>;
  }
}