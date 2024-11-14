import express from 'express';
import cors from 'cors';
import covidRoutes from './routes/covidRoutes';

const app = express();

app.use(cors());
// Middleware to handle JSON responses
app.use(express.json());

// Use the routes
app.use('/api', covidRoutes);

// Handle 404s and errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
