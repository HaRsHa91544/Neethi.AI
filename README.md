# Neethi.AI

## Overview

Neethi.AI is a multilingual AI-powered fake content detection platform designed to verify news and URLs in real time.

The system combines multiple AI models with workflow automation to provide reliable verification results through a simple web interface.

### Key Capabilities

* Fake News Detection
* Fake URL Detection
* Multilingual Understanding
* Real-Time Verification
* AI-Powered Analysis
* History Tracking

---

## Problem Statement

Fake content spreads faster than ever before, making it difficult for people to verify information before sharing it.

Existing solutions often:

* Lack real-time verification
* Fail to support regional languages
* Depend heavily on pattern matching
* Cannot effectively validate hyperlocal content

Neethi.AI addresses these challenges by combining multiple AI models with real-time verification workflows.

---

## Features

### Fake News Detection

Analyze news content using multiple AI models and receive a detailed verification response.

### URL Safety Verification

Check suspicious URLs and determine whether they are potentially harmful or trustworthy.

### AI-Powered Cross Verification

Uses multiple AI systems to analyze information before generating a final verdict.

### User History

Stores previous verification results for future reference.

### Multilingual Support

Designed to process content from different languages and regions.

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* JWT
* Bcrypt

### Database

* MySQL

### Workflow Automation

* n8n

### AI Models

* Meta Llama 3.3B
* Perplexity Sonar
* Gemini 2.0 Flash

---

## System Architecture

```text
User
  │
  ▼
Frontend
  │
  ▼
Express Server
  │
  ▼
n8n Workflow
  │
  ├── Meta Llama 3.3B
  ├── Perplexity Sonar
  └── Gemini 2.0 Flash
  │
  ▼
MySQL Database
  │
  ▼
Express Server
  │
  ▼
Frontend
  │
  ▼
User Receives Result
```

---

## How It Works

### Fake News Detection Flow

1. User submits news content through the frontend.
2. The request is sent to the Express server.
3. The Express server forwards the request to an n8n workflow.
4. n8n invokes:

   * Meta Llama 3.3B
   * Perplexity Sonar
   * Gemini 2.0 Flash
5. AI responses are processed and verified.
6. Results are stored in MySQL.
7. n8n returns the final response to the Express server.
8. Express sends the response back to the frontend.
9. The verification result is displayed to the user.

### URL Detection Flow

1. User submits a URL.
2. The request reaches the Express server.
3. The server forwards the request to n8n.
4. n8n performs AI-powered analysis.
5. Verification results are stored in MySQL.
6. The final verdict is returned to the frontend.
7. The user receives the safety assessment.

---

## Project Structure

```text
features
│   about-us.html
│   check-back.html
│   fake-news-detector.html
│   history.html
│   how-it-works.html
│   index.html
│   my-profile.html
│   need-help.html
│   privacy-policy.html
│   terms-of-use.html
│   url-detector.html
│
├── backend
│   │   .env
│   │   config.js
│   │   db.js
│   │   neethi.sql
│   │   package.json
│   │   package-lock.json
│   │   server.js
│   │
│   └── routes
│           check-news.js
│           check-token.js
│           check-url.js
│           delete-account.js
│           get-details.js
│           history.js
│           login.js
│           send-details.js
│           signup.js
│           user-details.js
│
├── img
│       favicon.png
│       logo.png
│
├── scripts
│       fake-news-detector.js
│       history.js
│       my-profile.js
│       navbar.js
│       need-help.js
│       url-detector.js
│
└── styles
        about-us.css
        fake-news-detector.css
        footer.css
        history.css
        how-it-works.css
        my-profile.css
        navbar.css
        need-help.css
        privacy-policy.css
        style.css
        terms-of-use.css
        url-detector.css
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/HaRsHa91544/Neethi.AI.git
cd Neethi.AI
```

### Install Dependencies

```bash
cd features/backend
npm install
```

### Setup Database

1. Open MySQL or XAMPP.
2. Create a database.
3. Import the provided `neethi.sql` file.

### Configure Environment Variables

Create a `.env` file inside `features/backend`.

```env
JWT_SECRET=your_secret_key
```

### Start Backend Server

```bash
cd features/backend
node server.js
```

### Run Frontend

Open the `features` directory using Live Server.

---

## Future Improvements

* Advanced Source Tracking
* Enhanced AI Consensus Mechanism
* WhatsApp Integration
* Expanded Language Support
* Real-Time Threat Intelligence

---
