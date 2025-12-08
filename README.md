# ChatGPT Clone

A full-stack AI chat application built with React, Node.js, Express, and MongoDB. This project replicates the core functionality of ChatGPT with user authentication, credit-based messaging system, image generation, and community features.

## 🎯 Features

### Core Features
- **AI Chat**: Send text prompts to AI and get intelligent responses using Google's Gemini API
- **User Authentication**: Secure user registration and login with JWT tokens
- **Credit System**: Users start with 20 credits; each message costs 1 credit
- **Chat History**: Save and manage multiple conversations
- **Search Chats**: Search through your chat history
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

### Additional Features
- **Community Images**: Share and view AI-generated images from the community
- **Image Generation**: Generate images using AI (requires implementation)
- **User Profile**: View user information and credit balance
- **Message Timestamps**: Track when messages were sent

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Moment.js** - Date/time formatting
- **Prism.js** - Syntax highlighting for code blocks
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **OpenAI API** - AI completions (using Gemini model)
- **ImageKit** - Image hosting and management
- **CORS** - Cross-origin resource sharing

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
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database) or local MongoDB
- OpenAI API key (or Google Gemini API key)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/akanksha718/Chatgpt-clone.git
cd Chatgpt-clone
```

#### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file
# Add the following:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key
PORT=3000

# Start the server
npm run server
# or
npm start
```

#### 3. Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

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
Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
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

#### Get User Info
```http
GET /api/user/get
Authorization: Bearer jwt_token
```

### Message Routes (`/api/message`) - To be implemented

#### Send Text Message
```http
POST /api/message/text
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "chatId": "chat_id_here",
  "prompt": "Your message here"
}
```

## 🔐 Authentication Flow

1. **Register**: User creates account with name, email, password
2. **Hash Password**: Password is hashed using bcryptjs before storing
3. **Issue JWT**: JWT token is issued with 7-day expiration
4. **Login**: User logs in with email and password
5. **Verify Token**: Backend validates JWT on protected routes
6. **Access Protected Routes**: User can access API endpoints with valid token

## 💳 Credit System

- **Initial Credits**: Users get 20 credits upon registration
- **Cost Per Message**: 1 credit per AI message
- **Deduction**: Credits are deducted immediately after successful API response
- **Purchase**: Users can purchase additional credits (UI ready, implementation pending)

## 🗂 Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  credits: Number (default: 20),
  createdAt: Date
}
```

### Chat Schema
```javascript
{
  userId: ObjectId (reference to User),
  name: String,
  messages: [Message],
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema
```javascript
{
  role: String ("user" or "assistant"),
  content: String,
  timestamp: Date,
  isImage: Boolean
}
```

## 📝 Key Components

### AppContext (Global State)
Manages:
- User authentication state
- Chat list and selected chat
- Theme (dark/light mode)
- Navigation

### Sidebar Component
- Displays chat history
- Search functionality
- Navigation to Community and Credits
- New chat button
- Theme toggle

### ChatBox Component
- Displays messages with auto-scroll
- Input form for prompts
- Loading indicator
- Mode selector (text/image)

## 🐛 Known Issues & Fixes Applied

1. ✅ **Missing Login Route**: Added `/login` route to App.jsx
2. ✅ **bcrypt Import Missing**: Added bcrypt import to user.js model
3. ✅ **Pre-save Hook Error**: Fixed async function parameter in User model
4. ✅ **Error Logging**: Added error logging to registration endpoint

## 🔄 Message Flow

```
User sends message → ChatBox captures input → 
Backend validates user & chat → 
Message saved → AI API called → 
Response received → Message displayed → 
Credits deducted → Chat updated in DB
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Dark mode support
- Responsive breakpoints (mobile, tablet, desktop)
- Gradient backgrounds
- Custom color scheme (purples, blues, grays)

## 📚 Environment Variables

Create a `.env` file in the server directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatgpt-clone
JWT_SECRET=your_super_secret_key_here
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set API endpoint to production URL

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from GitHub
3. Ensure MongoDB is accessible

## 📖 Usage Guide

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Start Chat**: Click "New Chat" button
4. **Send Message**: Type your prompt and press send
5. **View History**: Access previous chats from sidebar
6. **Search**: Use search bar to find specific conversations
7. **Manage Credits**: Buy more credits on the Credits page

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with clear messages
5. Push to your fork
6. Create a Pull Request

## 📄 License

ISC License - feel free to use this project for learning and development

## 👨‍💻 Author

Created by **Akanksha** (akanksha718)

## 🙏 Acknowledgments

- OpenAI/Google Gemini for AI capabilities
- Tailwind CSS for styling
- MongoDB for database
- React community for amazing tools

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and screenshots

## 🎓 Learning Resources

This project demonstrates:
- Full-stack web development
- REST API design
- JWT authentication
- Database modeling with MongoDB
- React hooks and context API
- Responsive UI design
- Error handling and validation
- Credit-based system implementation

---

**Last Updated**: December 2025
**Status**: Active Development
