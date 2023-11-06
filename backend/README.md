## Welcome to the development branch for the Matcher Back-end project.

## Getting Started

### Prerequisites

- Install [NodeJS](https://nodejs.org/en) version 18.17.1 LTS or higher.
- Install [Yarn](https://yarnpkg.com/)
version 1.22.19 or higher.

### Installation

First, install the project dependencies using the command:

```
yarn
```

Run the development server:

```
yarn dev
```

## How to start

- To initialize, run the above step by typing ``` yarn dev```

## Database

### Prerequisites

- Install [Docker](https://docker.com)
- Install [Docker-Compose](https://docs.docker.com/compose/)
- Recommended to install Docker Extension on Visual Studio Code

## Initialization

- To initialize the database, with all the requirements met, you can go to the ```.docker``` folder and open the ```docker-compose.yml``` file.

- Right-click and execute the ```Compose Up``` command. This will run a command in the terminal: 
```
docker compose -f "backend\.docker\docker-compose.yml" up -d --build
``` 
Which will download the database image and start the database container.

- Once the process is complete, the database will be available for connection. I recommend using Beekeeper as a database manager. From there, you can connect to the database and access its tables.

- Finally, we need to configure [Prisma](https://prisma.io). To do this, open the terminal in the ```backend``` folder and enter the following command: 
```
npx prisma init --datasource-provider postgresql
```

- After running the above command, Prisma will initialize the ```Prisma``` folder and a ```.env``` file with the ```schema.prisma``` file. The ```schema.prisma``` file contains the model instances that we will use in the project, and the ```.env``` file contains our environment variables.

- Go to the ```.env``` file and configure the ```DATABASE_URL``` variable in the following format: 
```
postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public
``` 
For example: 
```
postgresql://philipe:senhaphilipe@localhost:5432/philipe_db?schema=public
```

- The environment variables used to configure the ```DATABASE_URL``` should be the same as those defined in the ```docker-compose.yml``` file in the ```.docker``` folder.

###### Example of Environment Variables used in the format:
```
- POSTGRES_HOST=localhost
- POSTGRES_USER=philipe
- POSTGRES_PASSWORD=senhaphilipe
- POSTGRES_DB=philipe_db
```

- After making this configuration, go to the ```schema.prisma``` file and define a Model for testing. Example:

```
model User {
  id        Int         @id @default(autoincrement  ())
  email     String      @unique
  name      String?
  password  String 
}
```

- Then, simply run the command: 
```
npx prisma migrate dev --name test-table
```
This command will generate a migration in the database. After that, go to your database manager (Beekeeper) and check if the User table was created in the public schema. If it is, the database is connected.

## Project Structure
```
├── .docker
├── node_modules
├── src
│   ├── controllers 
│   ├── middlewares
│   ├── tests
│   ├── types 
│   └── ... 
│  └── index.ts
│  └── routes.ts
└── prisma
│   ├── migrations
│  └── schema.prisma
└── ...

```

## License

This project is under license. See the [LICENSE](LICENSE) file for more details.