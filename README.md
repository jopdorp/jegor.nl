## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying wiki.js
```
helm repo add requarks https://charts.js.wiki
helm install wiki-js requarks/wiki --namespace jegor-nl --create-namespace
```