# Managing Data

## CRUD: A Full Data Lifecycle

Previously we explored approaches to [Publishing Data](https://github.com/ixd-system-design/API-Endpoints-for-Publishing-and-Searching) and [Collecting Data](https://github.com/ixd-system-design/Collecting-Data) by means of API Endpoints (backend) and HTML forms (frontend). Having thus addressed the first two letters of [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) ("Create" and "Read"), let's now implement the last two letters as well ("Update" and "Delete"). This will allow us to manage the full lifecycle of data records in our database.

In order to operate on existing documents, we need to identify them by ID. The following two endpoints will assume that we pass along the ID of the item to be updated or deleted:

1. An Express endpoint listens for HTTP [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT) requests, with an ID parameter and a body payload (the updated data). Prisma finds the corresponding document in the database and replaces it with the new data.
2. An Express endpoint listens for HTTP [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/DELETE) requests, with an ID parameter passed along. Prisma finds the corresponding document and removes it from the database.

To support these new operations on the frontend, we have adjusted the form behaviour. When editing an item, the ID of the item is stored in a hidden input field. This allows us to track which item is being edited, and send the correct ID to the backend when submitting updates. We also use the ID in the display template, so that the Edit and Delete buttons can function correctly, and so that we can identify which item to remove when deleting.

# API Endpoints

This [NodeJS](https://nodejs.org/en) App uses [Express](https://www.npmjs.com/package/express) and [Prisma](https://www.npmjs.com/package/prisma) to create API endpoints for full CRUD operations: Creating (POST), Reading (GET), Updating (PUT), and Deleting (DELETE). It assumes a [MongoDB](https://www.mongodb.com/products/platform/atlas-database) data collection.

## Setup

- Run `npm install` to install express and prisma.
- Add your MongoDB connection string to the `.env` file (see `.env.example` for an example).
- Be sure to include the name of the Database you want to connect to. For example, if your connection string is `mongodb+srv://username:password@cluster.abc.mongodb.net/MyDatabase`, you would change `MyDatabase` to any database name of your choosing.
- If you point to an existing database, you may wish to introspect the schema using the command `npx prisma db pull --force`.
- Alternately, you can start with a blank database, by pointing the connection string to a Database that doesn't exist yet (Mongo creates it automatically as soon as you refer to it).
- Run `npx prisma generate` to create the Prisma Client based on `schema.prisma`.
- Run `npm run start` to lauch the app.

## Learning Prompts

- Can you add a connection string to the NodeJS environment (e.g. .env file) for your own MongoDB Atlas Cluster?
- Use MongoDB Compass to verify that your data collection form is working.
- Try out all CRUD operations: Create a new cat, Edit an existing cat by clicking the Edit button, and Delete a cat you no longer need.
- Test the CRUD operations manually via a REST Client / API testing tool. For example try visiting the endpoints defined in `/routes/api.js` using GET, POST, PUT, and DELETE operations from Insomnia.
- Iterate on the prisma schema, form elements, and template, so that data collection and presentation make sense for your own use case.

## Iteration

A typical iteration pattern here would be as follows:

1. create form elements that fit your concept, each with a given `name` (`index.html`)
2. add the new element to the display template (`script.js`) using its proper `name`.
3. add the corresponding `name` to `schema.prisma` with relevant a data type and save
4. re-generate the Prisma Client from the schema using `npx prisma generate`
5. re-start the app using `npm run start`
6. test that all CRUD operations work as expected (Create, Read, Update, Delete)
7. verify that data changes are reflected in MongoDB Compass.
