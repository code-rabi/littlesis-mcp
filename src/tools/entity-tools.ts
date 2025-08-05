// Entity-related MCP tools for LittleSis API
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { LittleSisApi } from '../api.js';

export const getEntityTool: Tool = {
  name: 'get_entity',
  description: 'Get detailed information about a specific entity (person or organization) from LittleSis by ID',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The unique numerical ID of the entity in LittleSis database'
      }
    },
    required: ['id']
  }
};

export const getEntitesTool: Tool = {
  name: 'get_entities',
  description: 'Get information about multiple entities at once (up to 300 entities per request)',
  inputSchema: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        items: {
          type: 'number'
        },
        description: 'Array of entity IDs to retrieve (maximum 300)',
        maxItems: 300
      }
    },
    required: ['ids']
  }
};

export const searchEntitesTool: Tool = {
  name: 'search_entities',
  description: 'Search for entities by name. Results are ranked by number of relationships.',
  inputSchema: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
        description: 'Search query (entity name)'
      },
      page: {
        type: 'number',
        description: 'Page number for pagination (default: 1)',
        minimum: 1
      },
      regions: {
        type: 'number',
        description: 'Filter by region ID'
      },
      tags: {
        type: 'string',
        description: 'Filter by tags (e.g., "oil")'
      }
    },
    required: ['q']
  }
};

export const getEntityExtensionsTool: Tool = {
  name: 'get_entity_extensions',
  description: 'Get the types/extensions associated with an entity (Person, Organization, Business, etc.)',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The entity ID'
      },
      details: {
        type: 'boolean',
        description: 'Include additional details contained within extensions',
        default: false
      }
    },
    required: ['id']
  }
};

export const getEntityRelationshipsTool: Tool = {
  name: 'get_entity_relationships',
  description: 'Get all relationships this entity has with other entities',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The entity ID'
      },
      category_id: {
        type: 'number',
        description: 'Filter relationships by category (1-12)'
      },
      sort: {
        type: 'string',
        enum: ['amount', 'oldest', 'recent'],
        description: 'Sort order for relationships',
        default: 'recent'
      },
      page: {
        type: 'number',
        description: 'Page number for pagination',
        minimum: 1
      }
    },
    required: ['id']
  }
};

export const getEntityConnectionsTool: Tool = {
  name: 'get_entity_connections',
  description: 'Get other entities that this entity has relationships with',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The entity ID'
      },
      category_id: {
        type: 'number',
        description: 'Filter connections by relationship category'
      },
      page: {
        type: 'number',
        description: 'Page number for pagination',
        minimum: 1
      }
    },
    required: ['id']
  }
};

export const getEntityListsTool: Tool = {
  name: 'get_entity_lists',
  description: 'Get the lists that an entity appears on (e.g., Fortune 1000, lobbying lists)',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The entity ID'
      }
    },
    required: ['id']
  }
};

// Tool handlers
export async function handleGetEntity(args: any) {
  try {
    const result = await LittleSisApi.getEntity(args.id);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entity: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleGetEntities(args: any) {
  try {
    const result = await LittleSisApi.getEntities(args.ids);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entities: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleSearchEntities(args: any) {
  try {
    const result = await LittleSisApi.searchEntities(args);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching entities: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleGetEntityExtensions(args: any) {
  try {
    const result = await LittleSisApi.getEntityExtensions(args.id, args.details);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entity extensions: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleGetEntityRelationships(args: any) {
  try {
    const result = await LittleSisApi.getEntityRelationships(args.id, {
      category_id: args.category_id,
      sort: args.sort,
      page: args.page
    });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entity relationships: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleGetEntityConnections(args: any) {
  try {
    const result = await LittleSisApi.getEntityConnections(args.id, {
      category_id: args.category_id,
      page: args.page
    });
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entity connections: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}

export async function handleGetEntityLists(args: any) {
  try {
    const result = await LittleSisApi.getEntityLists(args.id);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching entity lists: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}