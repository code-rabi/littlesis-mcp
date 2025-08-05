// LittleSis API types based on the API documentation

export interface LittleSisApiResponse<T> {
  data: T;
  meta: {
    copyright: string;
    license: string;
    apiVersion: string;
    currentPage?: number;
    pageCount?: number;
  };
}

export interface LittleSisErrorResponse {
  errors: Array<{
    title: string;
  }>;
  meta: {
    copyright: string;
    license: string;
    apiVersion: string;
  };
}

export interface Entity {
  type: string;
  id: number;
  attributes: {
    id: number;
    name: string;
    blurb?: string;
    summary?: string;
    website?: string;
    start_date?: string;
    end_date?: string;
    parent_id?: number;
    primary_ext: "Person" | "Org";
    updated_at: string;
    types: string[];
    aliases: string[];
    tags?: string[];
    link_count?: number;
    // Additional fields for connections
    relationship_id?: number;
    relationship_category_id?: number;
  };
  links: {
    self: string;
  };
}

export interface Relationship {
  type: string;
  id: number;
  attributes: {
    id: number;
    entity1_id: number;
    entity2_id: number;
    category_id: number;
    category_name?: string;
    description: string;
    description1?: string;
    description2?: string;
    amount?: number;
    currency?: string;
    goods?: string;
    filings?: number;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    updated_at: string;
    category_attributes?: Record<string, any>;
  };
  links?: {
    self?: string;
    entity?: string;
    related?: string;
  };
}

export interface Extension {
  type: string;
  id: number;
  attributes: {
    id: number;
    definition_id: number;
    display_name: string;
    name: string;
  };
}

export interface List {
  type: string;
  id: number;
  attributes: {
    id: number;
    name: string;
    description: string;
    is_ranked: boolean;
    is_featured: boolean;
    updated_at: string;
    short_description?: string;
    entity_count: number;
  };
  links: {
    self: string;
  };
}

export interface RelationshipWithEntities extends LittleSisApiResponse<Relationship> {
  included?: Entity[];
}

// Search parameters
export interface EntitySearchParams {
  q: string;
  page?: number;
  regions?: number;
  tags?: string;
}

export interface EntityRelationshipsParams {
  category_id?: number;
  sort?: "amount" | "oldest" | "recent";
  page?: number;
}

export interface EntityConnectionsParams {
  category_id?: number;
  page?: number;
}