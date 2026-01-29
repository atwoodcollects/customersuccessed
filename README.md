# CustomerSuccessed

**From customer obsessed to successed.**

Your AI copilot for customer success. Paste an email thread, get instant account insights and next steps.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Then add your API key from [console.anthropic.com](https://console.anthropic.com/):

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option 1: One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/customersuccessed)

### Option 2: Manual deploy

1. Push this code to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Deploy

### Custom domain

1. Go to your project settings in Vercel
2. Add `customersuccessed.com` as a custom domain
3. Update your DNS records as instructed

## Features

- **Account Analysis**: Paste email threads or describe situations to get instant health assessments
- **Signal Detection**: Automatically identifies positive, negative, and neutral signals
- **Actionable Recommendations**: Concrete next steps tailored to your situation
- **Draft Emails**: AI-generated follow-up messages ready to send
- **PDF Reports**: Download shareable reports for leadership

## Tech Stack

- Next.js 14
- Claude API (Sonnet)
- jsPDF for report generation
- Deployed on Vercel
