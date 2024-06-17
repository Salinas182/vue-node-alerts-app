# vue-accessibility-app

To have the app running, a brief configuration must be done and some scripts must be run from both 'back' and 'front' directories.

## Environment variables
A '.env' file must be created inside the 'back' and 'front' folders. The first one must contain values for the front-end url ('FRONT') and the port the server is going to use ('PORT'):

`FRONT=http://localhost:5173`

`PORT=5000`

The one inside the front folder must contain a value for the server url (VITE_APP_API_URL). For example:

`VITE_APP_API_URL=http://localhost:5000`

## Available Scripts

In both 'back' and 'front' directories, you must run:

### `npm install`

Installs all the necessary dependencies for the app to run correctly.

Then, in the 'back' directory:
### `npm start`

And, in the 'front' directory:
### `npm run dev`

These 2 last commands run the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

Finally, to run the app tests, you just have to run, in both directories, the following command:
### `npm test`


## API Reference

#### Get all alerts

```http
  GET /alerts
```

#### Get priority info

```http
  GET /priority
```

#### Create a new alert

```http
  POST /create
```

An object must be sent as body to this endpoint in order to create a new alert, containing the following properties:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `string` | **Required**. Key for the new alert |
| `title` | `string` | **Required**. Title, which will be shown to the users, for the new alert |
| `image` | `string` | **Required**. Image URL to represent the new alert |
| `priority` | `number` | **Required**. Priority for the new alert, being 1 the highest and 4 the lowest |
