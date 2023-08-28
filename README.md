# fastapi-react-project

## Features

- **FastAPI** with Python 3.8
- **React 16** with Typescript, Redux, and react-router
- Postgres
- SqlAlchemy with Alembic for migrations
- Pytest for backend tests
- Jest for frontend tests
- Perttier/Eslint (with Airbnb style guide)
- Docker compose for easier development
- Nginx as a reverse proxy to allow backend and frontend on the same port

## Development

The only dependencies for this project should be docker and docker-compose.

### Quick Start

Starting the project with hot-reloading enabled
(the first time it will take a while):

```bash
docker-compose up -d
```

To run the alembic migrations (for the users table):

```bash
docker-compose run --rm backend alembic upgrade head
```

And navigate to http://localhost:8000

_Note: If you see an Nginx error at first with a `502: Bad Gateway` page, you may have to wait for webpack to build the development server (the nginx container builds much more quickly)._

Auto-generated docs will be at
http://localhost:8000/api/docs

### Rebuilding containers:

```
docker-compose build
```

### Restarting containers:

```
docker-compose restart
```

### Bringing containers down:

```
docker-compose down
```


### Frontend Development

Alternatively to running inside docker, it can sometimes be easier
to use npm directly for quicker reloading. To run using npm:

```
cd frontend
npm install
npm start
```

This should redirect you to http://localhost:3000

### Frontend Tests

```
cd frontend
npm install
npm test
```

## Migrations

Migrations are run using alembic. To run all migrations:

```
docker-compose run --rm backend alembic upgrade head
```

To create a new migration:

```
alembic revision -m "create users table"
```

To delete migration
Replace <revision_id> with the ID of the migration you want to undo
```
alembic revision --revise=<revision_id>

```

To repopulate database restart backend docker conatiner
```
sudo docker restart <container_id>
```



And fill in `upgrade` and `downgrade` methods. For more information see
[Alembic's official documentation](https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script).

## Testing

There is a helper script for both frontend and backend tests:

```
./scripts/test.sh
```

### Backend Tests

```
docker-compose run backend pytest
```

any arguments to pytest can also be passed after this command

### Frontend Tests

```
docker-compose run frontend test
```

This is the same as running npm test from within the frontend directory

## Logging

```
docker-compose logs
```

Or for a specific service:

```
docker-compose logs -f name_of_service # frontend|backend|db
```

## Project Layout

```
backend
└── app
    ├── alembic
    │   └── versions # where migrations are located
    ├── api
    │   └── api_v1
    │       └── endpoints
    ├── core    # config
    ├── db      # db models
    ├── tests   # pytest
    └── main.py # entrypoint to backend

frontend
└── public
└── src
    ├── components
    │   └── Home.tsx
    ├── config
    │   └── index.tsx   # constants
    ├── __tests__
    │   └── test_home.tsx
    ├── index.tsx   # entrypoint
    └── App.tsx     # handles routing
```

```
fastapi_react_app
├─ .docker
│  └─ .ipython
├─ .git
│  ├─ HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-875e580ffacdcb6a32aff92d9f69f366fb221f4f.idx
│  │     └─ pack-875e580ffacdcb6a32aff92d9f69f366fb221f4f.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .prettierignore
├─ README.md
├─ backend
│  ├─ Dockerfile
│  ├─ alembic.ini
│  ├─ app
│  │  ├─ __init__.py
│  │  ├─ alembic
│  │  │  ├─ README
│  │  │  ├─ __init__.py
│  │  │  ├─ env.py
│  │  │  ├─ script.py.mako
│  │  │  └─ versions
│  │  │     └─ 91979b40eb38_create_users_table.py
│  │  ├─ alembic.ini
│  │  ├─ api
│  │  │  ├─ __init__.py
│  │  │  ├─ api_v1
│  │  │  │  └─ __init__.py
│  │  │  └─ dependencies
│  │  │     └─ __init__.py
│  │  ├─ core
│  │  │  ├─ __init__.py
│  │  │  ├─ auth.py
│  │  │  ├─ celery_app.py
│  │  │  ├─ config.py
│  │  │  └─ security.py
│  │  ├─ db
│  │  │  ├─ __init__.py
│  │  │  ├─ crud.py
│  │  │  ├─ models.py
│  │  │  ├─ schemas.py
│  │  │  └─ session.py
│  │  ├─ initial_data.py
│  │  ├─ main.py
│  │  ├─ tasks.py
│  │  └─ tests
│  │     ├─ __init__.py
│  │     ├─ test_main.py
│  │     └─ test_tasks.py
│  ├─ conftest.py
│  ├─ pyproject.toml
│  └─ requirements.txt
├─ docker-compose.yml
├─ frontend
│  ├─ .dockerignore
│  ├─ .eslintrc.js
│  ├─ .prettierrc.js
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ run.sh
│  ├─ src
│  │  ├─ App.tsx
│  │  ├─ __tests__
│  │  │  ├─ home.test.tsx
│  │  │  └─ login.test.tsx
│  │  ├─ admin
│  │  │  ├─ Admin.tsx
│  │  │  ├─ Users
│  │  │  │  ├─ UserCreate.tsx
│  │  │  │  ├─ UserEdit.tsx
│  │  │  │  ├─ UserList.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ authProvider.ts
│  │  │  └─ index.ts
│  │  ├─ config
│  │  │  └─ index.tsx
│  │  ├─ decs.d.ts
│  │  ├─ index.css
│  │  ├─ index.tsx
│  │  ├─ logo.svg
│  │  ├─ react-app-env.d.ts
│  │  ├─ utils
│  │  │  ├─ api.ts
│  │  │  ├─ auth.ts
│  │  │  └─ index.ts
│  │  └─ views
│  │     ├─ Home.tsx
│  │     ├─ Login.tsx
│  │     ├─ Protected.tsx
│  │     ├─ SignUp.tsx
│  │     └─ index.ts
│  └─ tsconfig.json
├─ nginx
│  └─ nginx.conf
└─ scripts
   ├─ build.sh
   ├─ test.sh
   └─ test_backend.sh

```