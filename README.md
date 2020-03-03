# Zuck Life

## Project Structure

```
├── README.md
├── frontend (React         - Javascript)
├── API      (Express/Proxy - Typescript)
└── services (Foxx          - Typescript)
    ├── auth  (Sessions logic)
    ├── posts (Posts, comments, ratings)
    └── user  (Followings, timelines, etc.)
```

## Running The App

Install the dependencies:

```sh
./install_packages.sh
```

Run each service:

- Frontend - `yarn start`
- API - `npm run watch`
- Services
  - {Auth,User,Posts} - `npm run install:service`
