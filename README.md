# Next.js on DOCKER

> How process.env behaves in `pages`

```bash
git clone https://github.com/leosuncin/next-on-docker.git
cd next-on-docker
cp .env.example .env
docker build -t next-on-docker --build-arg BUILD_VARIABLE="Value at build"
docker run -it --rm -p 3000:3000 --env-file .env next-on-docker
```

## Static pages

- Values from `next/config` are static (do not change after build)
- Values from `process.env` are static (do not change after build)
- Values fetched from API are dynamic

## Server Side (getInitialProps & getServerSideProps)

- Values from `next/config` are dynamic
- Values from `process.env` are static (do not change after build)
- Values from `props` are dynamic
- Values fetched from API are dynamic

## Server side generated (StaticPropsPage)

- Values from `next/config` are static (do not change after build)
- Values from `process.env` are static (do not change after build)
- Values from `props` are static
- Values fetched from API are dynamic
