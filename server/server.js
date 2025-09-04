import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const PROPERTIES_FILE = path.join(__dirname, 'data', 'properties.json');
const COMPANIES_FILE = path.join(__dirname, 'data', 'companies.json');

// Ensure data directory exists
try {
  await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
} catch (error) {
  // Directory already exists
}

// Helper function to read JSON file
async function readJSONFile(filePath, defaultData = []) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist, return default data
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

// Helper function to write JSON file
async function writeJSONFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Properties endpoints
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await readJSONFile(PROPERTIES_FILE, []);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Immobilien' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const properties = await readJSONFile(PROPERTIES_FILE, []);
    const newProperty = {
      ...req.body,
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1
    };
    
    properties.push(newProperty);
    await writeJSONFile(PROPERTIES_FILE, properties);
    
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern der Immobilie' });
  }
});

app.put('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readJSONFile(PROPERTIES_FILE, []);
    const id = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Immobilie nicht gefunden' });
    }
    
    properties[index] = { ...req.body, id };
    await writeJSONFile(PROPERTIES_FILE, properties);
    
    res.json(properties[index]);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Immobilie' });
  }
});

app.delete('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readJSONFile(PROPERTIES_FILE, []);
    const id = parseInt(req.params.id);
    const filteredProperties = properties.filter(p => p.id !== id);
    
    if (filteredProperties.length === properties.length) {
      return res.status(404).json({ error: 'Immobilie nicht gefunden' });
    }
    
    await writeJSONFile(PROPERTIES_FILE, filteredProperties);
    res.json({ message: 'Immobilie gelöscht' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen der Immobilie' });
  }
});

// Companies endpoints
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await readJSONFile(COMPANIES_FILE, []);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Unternehmen' });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const companies = await readJSONFile(COMPANIES_FILE, []);
    const newCompany = {
      ...req.body,
      id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1
    };
    
    companies.push(newCompany);
    await writeJSONFile(COMPANIES_FILE, companies);
    
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern des Unternehmens' });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const companies = await readJSONFile(COMPANIES_FILE, []);
    const id = parseInt(req.params.id);
    const index = companies.findIndex(c => c.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Unternehmen nicht gefunden' });
    }
    
    companies[index] = { ...req.body, id };
    await writeJSONFile(COMPANIES_FILE, companies);
    
    res.json(companies[index]);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Unternehmens' });
  }
});

app.delete('/api/companies/:id', async (req, res) => {
  try {
    const companies = await readJSONFile(COMPANIES_FILE, []);
    const id = parseInt(req.params.id);
    const filteredCompanies = companies.filter(c => c.id !== id);
    
    if (filteredCompanies.length === companies.length) {
      return res.status(404).json({ error: 'Unternehmen nicht gefunden' });
    }
    
    await writeJSONFile(COMPANIES_FILE, filteredCompanies);
    res.json({ message: 'Unternehmen gelöscht' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen des Unternehmens' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend Server läuft auf http://localhost:${PORT}`);
});