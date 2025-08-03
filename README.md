# SkillLane Assignment
Author: Chinakrit Lorpiyanon
## Running in dev mode
Compatible with Node v.22
### Backend (./library-backend)
* create a postgres database and config the connection in `.env` using the example from `.env.example`
* run the following command to create tables
```
$ yarn db:migration:up
```
* run the following command to start the application in dev mode
```
$ yarn start:dev
```
### Frontend (./library-frontend)
* config `VITE_BACKEND_HOST` to point to the running backend service (usually runs on port 3000) in the file `.env` using the example from `.env.example`
* run the following command to start the application in dev mode
```
$ yarn dev
```

## Trade-offs and improvements
* Due to limited time the following decisions have been made
  * Uploading a book cover is done using base64 data through the payload which supports small size images only. Improvements can be made by using different approach (e.g. multer) and upload to storage bucket.
  * Borrowing and returning books are done in the simplest way without tracking; anyone can borrow and return books freely without the system knowing which copy of the book is borrowed or returned by whom. Improvements can be made by create tracking table in the database to track the books.
  * Fronend UI was made in the simplest way possible. Improvements can be made by using component libraries for making better looking UI.
  * Authentication can be done using JWT, or the tokens can be stored in a more persistent storage (e.g.Redis).