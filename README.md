# Grounding AI Applications with React, JavaScript, Langchain and Elasticsearch Workshop

This repo contains the content and final solution for the "Grounding AI Applications with React, JavaScript, Langchain and Elasticsearch" workshop, given at React Day Berlin.

## Final Result

This workshop will walk through how to add simple traditional search to an application, and how to build Oscar, a simple RAG-based chatbot.

## Getting Started

Prior to building the application using the supplied [worksheets](./lab-sheets/), please ensure you have met [the stated install prerequisites](./lab-sheets/0-prerequisites.md).

Initialising the starting point RAG application is possible via the below commands:

```zsh
cd movie-rag
npm install
```

*Note: if you receive error **You are using Node.js 19.0.0. For Next.js, Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required.**, ensure you are using a compatible version of Node.js using the below steps:*

```zsh
nvm install 20.13.1
nvm use 20.13.1
```

## Technologies Used

1. [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) and the [Elasticsearch JavaScript client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
2. [Langchain JS](https://js.langchain.com/docs/introduction/)
3. [Ollama](https://ollama.com/)
4. [AI by Vercel SDK, including the UI SDK](https://sdk.vercel.ai/)
5. [React](https://react.dev/), specifically [Next.js](https://nextjs.org/)