# LittleSis MCP Server

An MCP (Model Context Protocol) server that provides access to the [LittleSis API](https://littlesis.org/api) for tracking corporate power and accountability relationships.

## API Coverage

This MCP server implements all major LittleSis API endpoints:

### Entity Tools
- `get_entity` - Get detailed information about a specific entity
- `get_entities` - Get multiple entities at once (up to 300)
- `search_entities` - Search for entities by name with filtering
- `get_entity_extensions` - Get entity types/classifications
- `get_entity_relationships` - Get all relationships for an entity
- `get_entity_connections` - Get connected entities
- `get_entity_lists` - Get lists an entity appears on

### Relationship Tools
- `get_relationship` - Get detailed relationship information



## Usage Examples

```json
{
    "mcpServers": {
        "littlesis": {
            "command": "node",
            "args": ["dist/index.js"],
            "cwd": "/path/to/littlesis-mcp"
        }
    }
}
```

## Data License

All data accessed through this MCP server is from LittleSis and is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## About LittleSis

[LittleSis](https://littlesis.org) is a free database of who-knows-who at the heights of business and government. It tracks the revolving door between business and government, political donations, and more.

## License

MIT License - see LICENSE file for details.