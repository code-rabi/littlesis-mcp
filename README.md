# LittleSis MCP Server

An MCP (Model Context Protocol) server that provides access to the [LittleSis API](https://littlesis.org/api) for tracking corporate power and accountability relationships.

## Features

- **Entity Management**: Search and retrieve detailed information about people and organizations
- **Relationship Tracking**: Explore connections between entities including donations, board positions, employment, etc.
- **Power Mapping**: Access curated lists and categorized relationships
- **Extensions**: Get entity types and classifications (Business Person, Public Company, etc.)

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

## Installation

### Using Smithery (Recommended)

1. Install the Smithery CLI:
```bash
npm install -g smithery
```

2. Clone and setup:
```bash
git clone <your-repo>
cd littlesis-mcp
npm install
```

3. Development:
```bash
npm run dev
```

4. Build and deploy:
```bash
npm run build
smithery deploy
```

### Manual Setup

```bash
npm install
npm run build
npm start
```

## Usage Examples

### Search for Entities
```typescript
// Search for entities by name
{
  "tool": "search_entities",
  "arguments": {
    "q": "Goldman Sachs",
    "page": 1
  }
}
```

### Get Entity Details
```typescript
// Get detailed information about an entity
{
  "tool": "get_entity", 
  "arguments": {
    "id": 1234
  }
}
```

### Find Relationships
```typescript
// Get all relationships for an entity
{
  "tool": "get_entity_relationships",
  "arguments": {
    "id": 1234,
    "category_id": 5,  // Campaign contributions
    "sort": "amount"
  }
}
```

### Explore Connections
```typescript
// Get entities connected to this one
{
  "tool": "get_entity_connections",
  "arguments": {
    "id": 1234,
    "category_id": 1  // Board positions
  }
}
```

## Relationship Categories

LittleSis tracks various types of relationships:
1. Position (board memberships, employment)
2. Education (schools attended)
3. Membership (organization memberships)
4. Family (family relationships)
5. Donation/Grant (political and charitable giving)
6. Transaction (business deals)
7. Lobbying (lobbying relationships)
8. Social (social/professional relationships)
9. Professional (business relationships)
10. Ownership (ownership stakes)
11. Hierarchy (parent/subsidiary relationships)
12. Generic (other relationships)

## Data License

All data accessed through this MCP server is from LittleSis and is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## About LittleSis

[LittleSis](https://littlesis.org) is a free database of who-knows-who at the heights of business and government. It tracks the revolving door between business and government, political donations, and more.

## License

MIT License - see LICENSE file for details.