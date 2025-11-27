import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverPath = path.join(__dirname, 'src', 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

if (!content.includes('migrationsRoutes')) {
  // Add import
  content = content.replace(
    "import projectsRoutes from './routes/projects.js';",
    "import projectsRoutes from './routes/projects.js';\nimport migrationsRoutes from './routes/migrations.js';"
  );

  // Add route
  content = content.replace(
    "app.use('/api/projects', projectsRoutes);",
    "app.use('/api/projects', projectsRoutes);\napp.use('/migrations', migrationsRoutes);"
  );

  fs.writeFileSync(serverPath, content);
  console.log('Added migrations routes to server.js');
} else {
  console.log('Migrations routes already added');
}
