# KlordGPT

<div align="center">
  <strong>An AI-powered search and summarization tool built with modern web technologies</strong>
  <br />
  <a href="https://klord-gpt.vercel.app/">🚀 Live Demo</a> • 
  <a href="#features">Features</a> • 
  <a href="#tech-stack">Tech Stack</a> • 
  <a href="#getting-started">Getting Started</a>
</div>

---

## 📋 Overview

KlordGPT is a full-stack web application that leverages AI capabilities to provide intelligent search and content summarization. Built with the MERN stack and integrated with powerful APIs, it delivers a seamless user experience for searching, analyzing, and summarizing information.

## ✨ Features

- 🔍 **Intelligent Search**: Fast and accurate search functionality
- 🤖 **AI-Powered Summarization**: Leveraging modern AI models for content analysis
- 📱 **Responsive Design**: Works seamlessly across all devices
- ⚡ **Real-time Processing**: Instant results and feedback
- 🎨 **Modern UI**: Clean and intuitive user interface
- 🔐 **Secure Architecture**: Built with security best practices
- ☁️ **Cloud Deployed**: Hosted on Vercel for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive components
- **HTML5 & CSS3** - Semantic markup and modern styling
- **JavaScript (ES6+)** - Modern JavaScript for dynamic functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework for API development
- **MongoDB** - NoSQL database for data persistence

### APIs & Services
- **Perplexity API** - AI-powered search and summarization
- **External APIs** - Integration with third-party services

### Deployment
- **Vercel** - Frontend hosting and deployment

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chetannaik698/KlordGPT.git
   cd KlordGPT
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PERPLEXITY_API_KEY=your_perplexity_api_key
   NODE_ENV=development
   PORT=5000
   ```

### Running the Application

**Development Mode:**

- Start the backend server:
  ```bash
  cd backend
  npm start
  ```

- In another terminal, start the frontend:
  ```bash
  cd frontend
  npm start
  ```

- Open your browser and navigate to `http://localhost:3000`

**Production Build:**

```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
KlordGPT/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── ...
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

## 🔌 API Endpoints

### Search
- `GET /api/search` - Perform a search query
- `POST /api/search` - Submit a new search request

### Summarization
- `POST /api/summarize` - Get AI-powered content summarization

## 📚 Usage Examples

### Frontend Usage
```javascript
// Example: Making a search request
const response = await fetch('/api/search', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'your search query' })
});
const data = await response.json();
console.log(data);
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Chetan Naik** (@Chetannaik698)

## 🔗 Links

- **Live Demo**: [https://klord-gpt.vercel.app/](https://klord-gpt.vercel.app/)
- **GitHub Repository**: [https://github.com/Chetannaik698/KlordGPT](https://github.com/Chetannaik698/KlordGPT)
- **Issues**: [Report a bug](https://github.com/Chetannaik698/KlordGPT/issues)

## 📞 Support

For support or questions, please open an issue on the GitHub repository.

---

<div align="center">
  Made with ❤️ by Chetan Naik
  <br />
  <a href="https://klord-gpt.vercel.app/">Visit Live Demo →</a>
</div>
