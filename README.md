# 🚀 Freelance Bidding Platform

A full-stack web application that connects buyers (clients) with sellers (freelancers) through a comprehensive project bidding system. Built with modern technologies and featuring real-time interactions, secure authentication, and seamless user experience.

## 📸 Screenshots

![Dashboard](https://via.placeholder.com/800x400?text=Buyer+Dashboard)
*Buyer Dashboard - Manage projects and view bids*

![Projects](https://via.placeholder.com/800x400?text=Seller+Projects)
*Seller View - Browse and bid on projects*

## ✨ Features

### 👤 **Buyer Features**
- 📝 Create and manage projects with detailed specifications
- 💰 Set budget ranges and deadlines
- 📊 Review and compare seller bids
- ✅ Select the best seller for each project
- 📁 View and download project deliverables
- ✉️ Receive email notifications for new bids
- 🎯 Mark projects as completed

### 💼 **Seller Features**
- 🔍 Browse available projects by category and budget
- 💡 Submit competitive bids with custom proposals
- ⏰ Set estimated completion timelines
- 📤 Upload deliverables (files or external links)
- 📈 Track bid status and project progress
- 📧 Get notified when selected for projects
- 📋 Manage ongoing and completed projects

### 🔒 **Authentication & Security**
- 🛡️ JWT-based authentication with refresh tokens
- 🔐 Role-based access control (Buyer/Seller)
- 🍪 HTTP-only cookies for enhanced security
- 🔄 Automatic token refresh for seamless UX
- 🛠️ Password hashing with bcrypt
- 🚫 CORS protection and input validation

## 🏗️ **Tech Stack**

### **Frontend**
- ⚛️ **Next.js 15** - React framework with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌈 **Glassmorphism Design** - Modern UI with backdrop blur effects
- 📡 **Axios** - HTTP client with interceptors
- 🔄 **React Hooks** - State management and lifecycle
- 📱 **Responsive Design** - Mobile-first approach

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Web application framework
- 📘 **TypeScript** - Type-safe development
- 🗄️ **PostgreSQL** - Relational database
- 🔧 **Prisma ORM** - Database toolkit and query builder
- 🔐 **JWT** - JSON Web Tokens for authentication
- 📧 **Nodemailer** - Email notifications
- 📁 **Multer** - File upload handling

### **DevOps & Tools**
- ☁️ **Vercel** - Frontend deployment
- 🚄 **Railway** - Backend hosting
- 🐘 **PostgreSQL** - Database hosting
- 🔧 **Prisma Studio** - Database management
- 📦 **npm** - Package management

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/freelance-bidding-platform.git
cd freelance-bidding-platform
```

### **2. Backend Setup**
```bash
cd back-end

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
DATABASE_URL="postgresql://username:password@localhost:5432/freelance_db"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_REFRESH_SECRET="your-refresh-secret-different-from-access"
MAIL_SENDER_EMAIL="your-email@gmail.com"
MAIL_SENDER_PASSWORD="your-app-password"

# Run database migrations
npx prisma migrate deploy
npx prisma generate

# Start the server
npm run dev
```

### **3. Frontend Setup**
```bash
cd front-end

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_BACK_END=http://localhost:5000" > .env.local

# Start the development server
npm run dev
```

### **4. Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database Studio: `npx prisma studio`

## 📁 **Project Structure**

```
freelance-bidding-platform/
├── 📁 back-end/
│   ├── 📁 middleware/           # Authentication & validation
│   ├── 📁 routes/              # API endpoints
│   ├── 📁 prisma/              # Database schema & migrations
│   ├── 📁 utils/               # Helper functions
│   ├── 📄 server.ts            # Express server setup
│   └── 📄 .env                 # Environment variables
├── 📁 front-end/
│   ├── 📁 app/                 # Next.js app directory
│   │   ├── 📁 buyer/           # Buyer-specific pages
│   │   ├── 📁 seller/          # Seller-specific pages
│   │   ├── 📁 auth/            # Authentication pages
│   │   └── 📄 layout.tsx       # Root layout
│   ├── 📁 utils/               # Utilities & API client
│   ├── 📄 tailwind.config.js   # Tailwind configuration
│   └── 📄 .env.local           # Environment variables
└── 📄 README.md
```

## 🗄️ **Database Schema**

```sql
User {
  id          Int      @id @default(autoincrement())
  name        String
  email       String   @unique
  password    String
  role        Role     (BUYER | SELLER)
  refreshToken String?
}

Project {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  budgetMin   Int
  budgetMax   Int
  deadline    DateTime
  status      Status   @default(PENDING)
  buyerId     Int      # Foreign key to User
  sellerId    Int?     # Foreign key to User (nullable)
}

Bid {
  id            Int      @id @default(autoincrement())
  projectId     Int      # Foreign key to Project
  sellerId      Int      # Foreign key to User
  amount        Int
  estimatedTime String
  message       String
  createdAt     DateTime @default(now())
}

Deliverable {
  id        Int      @id @default(autoincrement())
  projectId Int      @unique # Foreign key to Project
  sellerId  Int      # Foreign key to User
  fileUrl   String?
  link      String?
  uploadedAt DateTime @default(now())
}
```

## 🔧 **Environment Variables**

### **Backend (.env)**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db"

# JWT Secrets (generate strong random strings)
JWT_SECRET="your-very-long-and-secure-jwt-secret-key-here"
JWT_REFRESH_SECRET="your-different-refresh-secret-key-here"

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration
MAIL_SENDER_EMAIL="your-email@gmail.com"
MAIL_SENDER_PASSWORD="your-gmail-app-password"

# CORS
FRONTEND_URL="http://localhost:3000"
```

### **Frontend (.env.local)**
```env
# Backend API URL
NEXT_PUBLIC_BACK_END=http://localhost:5000
```

## 📡 **API Endpoints**

### **Authentication**
```http
POST   /api/auth/register      # User registration
POST   /api/auth/login         # User login
POST   /api/auth/refresh-token # Refresh access token
GET    /api/auth/me           # Get current user
POST   /api/auth/logout       # User logout
```

### **Projects**
```http
GET    /api/project/projects        # Get user's projects
POST   /api/project/projects        # Create new project
GET    /api/project/projects/:id    # Get specific project
PUT    /api/project/projects/:id    # Update project/select seller
DELETE /api/project/projects/:id    # Delete project
GET    /api/project/projects/open   # Get open projects (sellers)
GET    /api/project/projects/my     # Get assigned projects (sellers)
```

### **Bids**
```http
POST   /api/bid/bids                    # Place a bid
GET    /api/bid/bids/mine              # Get seller's bids
GET    /api/bid/projects/:id/bids      # Get project bids
GET    /api/bid/projects/:id/hasBid    # Check if user has bid
GET    /api/bid/projects/:id/details   # Get project details for bidding
```

### **Deliverables**
```http
POST   /api/deliverable/projects/:id/deliverables  # Upload deliverable
GET    /api/deliverable/projects/:id/deliverables  # Get project deliverable
```

## 🎯 **Key Features Implementation**

### **1. Automatic Token Refresh**
```typescript
// Axios interceptor handles token refresh seamlessly
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !originalRequest._retry) {
      // Automatically refresh token and retry request
    }
  }
);
```

### **2. Role-based Access Control**
```typescript
// Middleware checks user roles for protected routes
export function authorizeRole(role: 'BUYER' | 'SELLER') {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
}
```

### **3. File Upload System**
```typescript
// Handles both file uploads and external links
router.post('/deliverables', upload.single('file'), async (req, res) => {
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const { link } = req.body;
  // Save to database...
});
```

## 🧪 **Testing**

### **Run Tests**
```bash
# Backend tests
cd back-end
npm test

# Frontend tests
cd front-end
npm test

# E2E tests
npm run test:e2e
```

### **Test Coverage**
- Unit tests for utility functions
- API endpoint testing
- Authentication flow testing
- Database operation testing
- Component rendering tests

## 🚀 **Deployment**

### **Frontend (Vercel)**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### **Backend (Railway)**
1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Configure PostgreSQL addon
4. Deploy with automatic builds

### **Environment Variables for Production**
```env
# Backend
DATABASE_URL="your-production-database-url"
JWT_SECRET="different-production-secret"
NODE_ENV="production"
FRONTEND_URL="https://your-frontend-domain.com"

# Frontend
NEXT_PUBLIC_BACK_END="https://your-backend-domain.com"
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style



