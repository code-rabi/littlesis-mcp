// Relationship-related MCP tools for LittleSis API
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { LittleSisApi } from '../api.js';

export const getRelationshipTool: Tool = {
  name: 'get_relationship',
  description: 'Get detailed information about a specific relationship between two entities',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'The unique numerical ID of the relationship in LittleSis database'
      }
    },
    required: ['id']
  }
};

// Tool handler
export async function handleGetRelationship(args: any) {
  try {
    const result = await LittleSisApi.getRelationship(args.id);
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
          text: `Error fetching relationship: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}