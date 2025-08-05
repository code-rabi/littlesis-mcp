#!/usr/bin/env node

// LittleSis MCP Server
// Provides access to LittleSis API for tracking corporate power and accountability

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// Import tools
import {
  // Entity tools
  getEntityTool,
  getEntitesTool,
  searchEntitesTool,
  getEntityExtensionsTool,
  getEntityRelationshipsTool,
  getEntityConnectionsTool,
  getEntityListsTool,
  // Relationship tools
  getRelationshipTool,
  // Handlers
  handleGetEntity,
  handleGetEntities,
  handleSearchEntities,
  handleGetEntityExtensions,
  handleGetEntityRelationships,
  handleGetEntityConnections,
  handleGetEntityLists,
  handleGetRelationship
} from './tools/index.js';

// Optional: Define configuration schema
export const configSchema = z.object({
  debug: z.boolean().default(false).describe("Enable debug logging")
});

// Default export for Smithery compatibility
function createServer({ config }: { config: z.infer<typeof configSchema> }) {
  // Create server instance
  const server = new Server(
    {
      name: 'littlesis-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Define all available tools
  const tools = [
    // Entity tools
    getEntityTool,
    getEntitesTool,
    searchEntitesTool,
    getEntityExtensionsTool,
    getEntityRelationshipsTool,
    getEntityConnectionsTool,
    getEntityListsTool,
    // Relationship tools
    getRelationshipTool,
  ];

  // Tool handlers mapping
  const toolHandlers = {
    get_entity: handleGetEntity,
    get_entities: handleGetEntities,
    search_entities: handleSearchEntities,
    get_entity_extensions: handleGetEntityExtensions,
    get_entity_relationships: handleGetEntityRelationships,
    get_entity_connections: handleGetEntityConnections,
    get_entity_lists: handleGetEntityLists,
    get_relationship: handleGetRelationship,
  };

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools,
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    const handler = toolHandlers[name as keyof typeof toolHandlers];
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    return await handler(args);
  });

  return server;
}

export default createServer;

// Check if this module is being run directly (for stdio compatibility)
// This handles direct execution, npx, and bin script execution
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     process.argv[1]?.endsWith('index.js') ||
                     process.argv[1]?.endsWith('dist/index.js') ||
                     process.argv[1]?.endsWith('littlesis-mcp') ||
                     process.argv[1]?.includes('/.bin/littlesis-mcp');

if (isMainModule) {
  // Start server with stdio transport when run directly
  async function main() {
    const server = createServer({ config: { debug: false } });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    // Server is now running
    console.error('LittleSis MCP Server running on stdio');
  }

  // Handle uncaught errors
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });

  // Start the server
  main().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}