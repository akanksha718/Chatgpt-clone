# 🤖 Qucik-GPT

A full-stack AI chat application built with **React 19**, **Node.js/Express**, and **MongoDB**. This project replicates the core functionality of ChatGPT with intelligent text responses, AI image generation, user authentication, credit-based billing, and community sharing features.

## 🎯 Key Features

### 💬 AI Chat
- **Text Generation**: Send prompts and receive AI-powered responses using Groq's Llama 3.3 or Google Gemini API
- **Chat History**: Save and manage unlimited conversations
- **Search Chats**: Quickly find past conversations
- **Real-time Streaming**: Watch responses generate in real-time
- **Markdown Support**: Full markdown rendering with syntax highlighting

### 🎨 Image Generation
- **AI Image Creation**: Generate unique images from text prompts using Replicate's SDXL model
- **Fallback Support**: Automatic fallback to Unsplash search if primary generation fails
- **ImageKit Storage**: Generated images stored and served via ImageKit CDN
- **Community Gallery**: Share generated images to community showcase

### 🔐 Authentication & Billing
- **Secure Auth**: JWT-based authentication with bcrypt password hashing
- **Credit System**: 
  - 20 initial credits per user
  - 1 credit per text message
  - 2 credits per image generation
  - Purchase additional credits via Stripe integration
- **Session Management**: Persistent login with secure token storage

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Mobile-first design using Tailwind CSS 4
- **Loading States**: Animated loaders during generation
- **Error Handling**: Clear error messages with user-friendly feedback
- **Toast Notifications**: Real-time feedback using react-hot-toast

### 👥 Community Features
- **Community Gallery**: Browse AI-generated images shared by users
- **Share Images**: Publish your creations to the community
- **User Profiles**: View user information and credit balance

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling framework
- **React Router 7** - Client-side routing and navigation
- **Axios 1.13** - HTTP client with interceptors
- **React Hot Toast** - Non-intrusive notifications
- **React Markdown** - Markdown parsing and rendering
- **Prism.js** - Syntax highlighting for code blocks
- **Moment.js** - Date and time formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Minimalist web framework
- **MongoDB** - NoSQL document database
- **Mongoose 8** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and verification
- **Axios** - HTTP client for external APIs
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing middleware

### External APIs & Services
- **Groq API** - Fast AI language model (Llama 3.3 70B)
- **Google Gemini API** - Advanced language model fallback
- **Replicate** - AI image generation via SDXL/Stable Diffusion
- **ImageKit** - Image hosting, optimization, and CDN
- **Stripe** - Payment processing (planned)
- **MongoDB Atlas** - Cloud database hosting

## 📁 Project Structure

```
chatgpt-clone/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx         # Chat sidebar with navigation
│   │   │   ├── ChatBox.jsx         # Main chat interface
│   │   │   └── Meassage.jsx        # Individual message component
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login/Register page
│   │   │   ├── Community.jsx       # Community images page
│   │   │   ├── Credits.jsx         # Credits page
│   │   │   └── Loading.jsx         # Loading component
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global state management
│   │   ├── assets/
│   │   │   └── assets.js           # Images and dummy data
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   ├── user.js                 # User schema
│   │   ├── chat.js                 # Chat schema
│   │   └── message.js              # Message schema
│   ├── controllers/
│   │   ├── userController.js       # User auth logic
│   │   └── messageController.js    # Message handling
│   ├── routes/
│   │   └── userRoute.js            # User endpoints
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication
│   ├── server.js                   # Express server setup
│   ├── package.json
│   └── .env                        # Environment variables
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ and npm/yarn
- **MongoDB Atlas** account or local MongoDB instance
- **API Keys**:
  - Groq API key (free tier available)
  - Google Gemini API key (fallback)
  - ImageKit account (free tier includes 20GB/month)
  - Replicate API key (free credits available)
- **Environment**: Windows, macOS, or Linux

### Quick Start

#### 1. Clone Repository
```bash
git clone https://github.com/akanksha718/Chatgpt-clone.git
cd Chatgpt-clone
```

#### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatgpt-clone

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI APIs
GROQ_API_KEY=gsk_your_groq_key_here
GEMINI_API_KEY=AIzaSy_your_gemini_key_here
OPENAI_API_KEY=sk-proj_your_openai_key_here

# Image Generation & Storage
REPLICATE_API_KEY=r8_your_replicate_key_here
IMAGEKIT_PUBLIC_KEY=public_your_imagekit_key_here
IMAGEKIT_PRIVATE_KEY=private_your_imagekit_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint

# Payment (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server
PORT=3000
EOF

# Start server
npm start
# Server runs at http://localhost:3000
```

#### 3. Frontend Setup
```bash
cd ../client
npm install

# Create .env file
echo "VITE_SERVER_URL=http://localhost:3000" > .env

# Start development server
npm run dev
# App runs at http://localhost:5173
```

### 🔑 Getting API Keys

#### Groq API
1. Visit https://console.groq.com
2. Sign up for free account
3. Create an API key
4. Copy and paste in `.env`

#### Google Gemini API
1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Select/create a project
4. Copy key and add to `.env`

#### ImageKit
1. Sign up at https://imagekit.io
2. Get Public Key, Private Key, and URL Endpoint
3. Add all three to `.env`

#### Replicate
1. Create account at https://replicate.com
2. Get API token from account settings
3. Add to `.env`

## 📁 Project Structure

```
chatgpt-clone/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx         # Main chat interface
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── Message.jsx         # Message display component
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Auth page
│   │   │   ├── Community.jsx       # Image gallery
│   │   │   ├── Credits.jsx         # Billing page
│   │   │   └── Loading.jsx         # Loader component
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global state & API calls
│   │   ├── assets/
│   │   │   ├── assets.js           # Images and icons
│   │   │   └── prism.css           # Code highlighting
│   │   ├── App.jsx                 # Main app wrapper
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   └── .env                    # Client environment vars
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                          # Express Backend
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   ├── openai.js               # AI client setup
│   │   └── imagekit.js             # ImageKit client
│   ├── models/
│   │   ├── user.js                 # User schema & auth
│   │   ├── Chat.js                 # Chat schema
│   │   └── imagePublished.js       # Community images
│   ├── controllers/
│   │   ├── userController.js       # Auth endpoints
│   │   ├── messageController.js    # Chat & image endpoints
│   │   └── chatController.js       # Chat management
│   ├── routes/
│   │   ├── userRoute.js            # /api/user/*
│   │   ├── messageRoute.js         # /api/message/*
│   │   └── chatRoute.js            # /api/chat/*
│   ├── middleware/
│   │   └── auth.js                 # JWT verification
│   ├── server.js                   # Express app setup
│   ├── package.json
│   ├── .env                        # Server environment vars
│   └── vercel.json                 # Deployment config
│
├── README.md                        # This file
└── .gitignore
```

## 📡 API Endpoints

### User Routes (`/api/user`)

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (201)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (200)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

#### Get User Info
```http
GET /api/user/data
Authorization: Bearer <jwt_token>
```
**Response (200)**:
```json
{
  "success": true,
  "user": {
    "_id": "67...",
    "name": "John Doe",
    "email": "john@example.com",
    "credits": 18
  }
}
```

### Chat Routes (`/api/chat`)

#### Create New Chat
```http
GET /api/chat/create
Authorization: Bearer <jwt_token>
```
**Response (200)**:
```json
{
  "success": true,
  "chat": {
    "_id": "67...",
    "messages": [],
    "createdAt": "2025-12-09T10:30:00Z"
  }
}
```

#### Get All Chats
```http
GET /api/chat/get
Authorization: Bearer <jwt_token>
```
**Response (200)**:
```json
{
  "success": true,
  "chats": [
    {
      "_id": "67...",
      "messages": [...],
      "createdAt": "2025-12-09T10:30:00Z"
    }
  ]
}
```

#### Delete Chat
```http
POST /api/chat/delete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "chatId": "67..."
}
```

### Message Routes (`/api/message`)

#### Send Text Message
```http
POST /api/message/text
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "chatId": "67...",
  "prompt": "Explain quantum computing in simple terms"
}
```
**Response (200)**:
```json
{
  "success": true,
  "reply": {
    "role": "assistant",
    "content": "Quantum computing uses quantum bits (qubits)...",
    "isImage": false,
    "timestamp": 1765268718408
  }
}
```

#### Generate Image
```http
POST /api/message/image
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "chatId": "67...",
  "prompt": "A futuristic city at sunset",
  "isPublished": false
}
```
**Response (200)**:
```json
{
  "success": true,
  "reply": {
    "role": "assistant",
    "content": "https://ik.imagekit.io/...",
    "isImage": true,
    "isPublished": false,
    "timestamp": 1765268718408
  }
}
```

### Error Responses

**Invalid Token (401)**:
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Not Enough Credits (400)**:
```json
{
  "success": false,
  "message": "Not enough credits"
}
```

**Server Error (500)**:
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details here"
}
```

## 🔐 Authentication & Security

### JWT Token Flow
```
User enters email/password
    ↓
Backend validates credentials
    ↓
Password compared with bcrypt hash
    ↓
JWT token generated (7-day expiration)
    ↓
Token stored in localStorage (client)
    ↓
Token sent in Authorization header for protected routes
    ↓
Middleware verifies token before processing request
```

### Password Security
- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Hashes never stored in plain text
- Passwords compared securely on login
- Pre-save hook ensures passwords hashed before DB storage

### Token Management
- JWT payload includes user ID
- Tokens expire after 7 days
- Client automatically logs out on expired token
- Token stored only in memory (not cookies) for security

## 💳 Credit System Details

| Action | Credits | Cost |
|--------|---------|------|
| Registration | 20 | Free |
| Text Message | -1 | Deducted |
| Image Generation | -2 | Deducted |
| Purchase (100) | +100 | $9.99 |
| Purchase (500) | +500 | $39.99 |

### Credit Flow
1. User sends message/generates image
2. System checks if user has enough credits
3. Request processed by AI API
4. Credits deducted from user account
5. Message saved to chat history
6. Response returned to user

## 🎨 UI/UX Features

### Responsive Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (two columns)
- **Desktop**: > 1024px (full layout)

### Dark Mode
- Toggle in sidebar footer
- Persists in localStorage
- Uses Tailwind dark: classes
- Custom color scheme optimized for dark mode

### Loading States
- Animated bouncing dots during AI response
- Skeleton screens for chat loading
- Disabled submit button during processing
- Toast notifications for errors/success

### Message Rendering
- Markdown support (headers, bold, italics, lists, code)
- Code syntax highlighting via Prism.js
- Image rendering with lightbox preview
- Timestamp formatting via Moment.js
- User/assistant message differentiation

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Output in ./dist
# Deploy dist folder to Vercel/Netlify
# Set environment variable: VITE_SERVER_URL=https://api.yourapp.com
```

### Backend (Railway/Render/Heroku)
```bash
# Set all environment variables in hosting platform
# Deploy from GitHub repo
# Platform will run: npm install && npm start
```

### MongoDB Atlas
- No action needed (cloud-hosted)
- Connection string in .env
- Whitelist server IP in Atlas dashboard

### ImageKit
- Already cloud-hosted
- No additional setup needed
- Automatic image optimization and CDN delivery

## 🧪 Testing the Application

### Test Account Flow
1. Click "Create account" on login page
2. Enter: name, email, password
3. Account created with 20 credits
4. Automatically logged in
5. Chat list shown (empty initially)

### Test Text Chat
1. Click "New Chat" button
2. Type: "Hello, how are you?"
3. Click send button
4. Wait for AI response
5. View credit deduction (20 → 19)

### Test Image Generation
1. Select "Image" from dropdown
2. Type prompt: "A sunset over mountains"
3. Click send
4. Wait 30-60 seconds for generation
5. Image appears in chat
6. Credit deducted: 2 credits

### Test Theme Toggle
1. Click moon/sun icon in sidebar
2. Page theme switches to dark/light
3. Refresh page - theme persists

### Test Search
1. Create multiple chats with messages
2. Click search icon in sidebar
3. Type keywords to filter chats
4. Matching chats highlighted

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  credits: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  messages: [
    {
      role: String ("user" | "assistant"),
      content: String,
      timestamp: Date,
      isImage: Boolean
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Image Collection (Published)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  imageUrl: String (ImageKit URL),
  prompt: String,
  likes: Number,
  downloads: Number,
  createdAt: Date
}
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: Check MONGODB_URI in .env, ensure IP whitelist in Atlas

### Issue: "API key invalid"
**Solution**: Verify API keys are correct, check for extra spaces in .env

### Issue: "CORS error"
**Solution**: Ensure backend CORS middleware allows your frontend URL

### Issue: "Images not generating"
**Solution**: Check Replicate/ImageKit credentials, verify rate limits not exceeded

### Issue: "Tokens not persisting"
**Solution**: Check localStorage is enabled, clear cache and try again

## 📈 Future Enhancements

- [ ] Voice input/output
- [ ] File upload and analysis
- [ ] Conversation export (PDF/JSON)
- [ ] Advanced prompts library
- [ ] Image editing tools
- [ ] Multi-language support
- [ ] User profiles & settings
- [ ] Payment gateway integration
- [ ] Real-time collaboration
- [ ] API rate limiting by user tier

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open Pull Request

### Code Style
- Use ESLint for consistency
- Follow React hooks conventions
- Add comments for complex logic
- Keep components focused and reusable

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Akanksha** (akanksha718)
- GitHub: https://github.com/akanksha718
- Repository: https://github.com/akanksha718/Chatgpt-clone

## 🙏 Acknowledgments

- **Groq** - Ultra-fast language model inference
- **Google** - Gemini API and excellent documentation
- **Replicate** - Simplified AI model deployment
- **ImageKit** - Image optimization and delivery
- **Tailwind CSS** - Beautiful utility-first styling
- **React & Vite** - Modern development experience

## 📞 Support & Community

- 🐛 **Bug Reports**: Open GitHub issue with reproduction steps
- 💡 **Feature Requests**: Submit ideas via GitHub discussions
- 💬 **Questions**: Use GitHub discussions for Q&A

## 📊 Project Statistics

- **Frontend**: ~500 lines (React components)
- **Backend**: ~800 lines (Controllers, routes, models)
- **Dependencies**: 25+ npm packages
- **APIs Integrated**: 4 (Groq, Gemini, Replicate, ImageKit)
- **Database**: MongoDB Atlas
- **Languages**: JavaScript (frontend & backend), CSS

## 🎯 Development Roadmap

### Phase 1 (Current) ✅
- [x] User authentication & JWT
- [x] Text chat with AI
- [x] Image generation
- [x] Chat history & search
- [x] Credit system
- [x] Dark mode

### Phase 2 (Planned)
- [ ] Payment integration
- [ ] Enhanced image features
- [ ] User profile customization
- [ ] Rate limiting per tier

### Phase 3 (Backlog)
- [ ] Voice features
- [ ] File uploads
- [ ] API for third-party apps
- [ ] Mobile app

---

**Last Updated**: December 2025  
**Version**: 1.0.0  
**Status**: 🟢 Active Development  
**Stability**: Beta
