import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Firebase Admin Setup
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized');
  } catch (err) {
    console.error('Failed to initialize Firebase Admin:', err);
  }
}

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticate = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // If Admin SDK is initialized, verify token
    if (admin.apps.length > 0) {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    } else {
      req.user = { email: req.headers['x-user-email'] || 'dev@example.com', uid: 'dev-uid' };
    }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user?.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// API Routes

// Menu
app.get('/api/menu', async (req, res) => {
  const items = await prisma.menuItem.findMany();
  res.json(items);
});

app.post('/api/menu', authenticate, isAdmin, async (req: any, res) => {
  const item = await prisma.menuItem.create({ data: req.body });
  res.json(item);
});

app.delete('/api/menu/:id', authenticate, isAdmin, async (req, res) => {
  await prisma.menuItem.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Orders
app.post('/api/orders', authenticate, async (req: any, res) => {
  const { items, total, customerName, customerEmail } = req.body;
  
  // Create user if not exists
  await prisma.user.upsert({
    where: { id: req.user.uid },
    update: { name: customerName, email: customerEmail },
    create: { id: req.user.uid, name: customerName, email: customerEmail, isAdmin: customerEmail === process.env.ADMIN_EMAIL }
  });

  const order = await prisma.order.create({
    data: {
      userId: req.user.uid,
      customerName,
      customerEmail,
      total,
      status: 'Pending',
      items: {
        create: items.map((item: any) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: { items: true }
  });
  res.json(order);
});

app.get('/api/orders', authenticate, async (req: any, res) => {
  if (req.user.email === process.env.ADMIN_EMAIL) {
    const orders = await prisma.order.findMany({
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } else {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.uid },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  }
});

app.patch('/api/orders/:id/status', authenticate, isAdmin, async (req: any, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(order);
});

// Analytics
app.get('/api/reports/sales', authenticate, isAdmin, async (req: any, res) => {
  const sales = await prisma.order.groupBy({
    by: ['status'],
    _sum: { total: true },
    _count: { id: true }
  });
  
  const dailyRev = await prisma.order.findMany({
    where: { status: 'Delivered' },
    select: { total: true, createdAt: true }
  });

  res.json({ sales, dailyRev });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
