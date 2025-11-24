# System Design - Video Game Collection Manager

## Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[index.html]
        C[script.js]
        D[style.css]
    end

    subgraph "Server Layer - Vercel"
        E[Express.js Server]
        F[API Routes]
        G[Static Files]
    end

    subgraph "Data Layer"
        H[Prisma ORM]
        I[Mongoose]
        J[(MongoDB Atlas)]
    end

    A -->|HTTP Request| E
    E -->|Serve Static| G
    C -->|Fetch API| F
    F -->|Query| H
    H -->|Connection| J
    J -->|Response| F
    F -->|JSON| C
```

## Component Breakdown

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js (REST API)
- **Database**: MongoDB Atlas via Prisma ORM
- **Deployment**: Vercel (Serverless)
- **Version Control**: Git + GitHub