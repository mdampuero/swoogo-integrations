### Install dependencies

```
npm install --legacy-peer-deps

```

Get configuration from bitwarden and create file .env

After run the application

```
ng serve
```

## DEPLOY

```
ng build --configuration production --base-href https://clickgroup-bo.latamhosting.com.ar
```

This commnad generate a version in folder dist, now commit this new changes for the deploy in to server

## IN SERVER

```
cd hosting/swoogo-integrations
git pull
./install 8081
```
