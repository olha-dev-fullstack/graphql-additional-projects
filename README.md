# GraphQL Job Board
This is a simple GraphQL job board application that enables users to sign in, create, manage, and publish job vacancies withing their company.

## 🚀 Features

- **User Authentication**: Sign-in functionality.
- **Vacancy Management**: Create, update, delete vacancies within certain companies

## 🛠️ Tech Stack

### Backend

- **JavaScript**
- **TypeScript**
- **Apollo Server**
- **GraphQL**
- **Knex**
- **SQLite**

### Frontend

- **React.js**

## 📜 GraphQL Schema

```javascript
type Query {
  company(id: ID!): Company
  job(id: ID!): Job
  jobs(limit: Int, offset: Int): JobSubList
}

type Mutation {
  createJob(input: CreateJobInput!): Job
  deleteJob(id: ID!): Job
  updateJob(input: UpdateJobInput!): Job
}

type Company {
  id: ID!
  name: String!
  description: String
  jobs: [Job!]!
}

type Job {
  id: ID!
  """The __date__ when the job was published, in ISO-8601 format. E.g. `2022-12-31`."""
  date: String!
  title: String!
  company: Company!
  description: String
}

type JobSubList {
  items: [Job!]!
  totalCount: Int!
}

input CreateJobInput {
  title: String!
  description: String
}

input UpdateJobInput {
  id: ID!
  title: String!
  description: String
}
```

## 📦 Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/olha-dev-fullstack/graphql-job-board
   ```
2. **Install dependencies:**
   ```bash
   cd client
   npm install

   cd server
   npm install
   ```

5. **Start the server:**
   ```bash
   cd client
   npm start

   cd server
   npm start
   ```

## 🎯 Usage Instructions

- Access the frontend to sign in and manage vacancies at http://localhost:3000
- GraphQl Playground to test API: http://localhost:9000/graphql
