# YAMSports

## Development

The website consists of a backend server and a frontend web client. I recommend using PyCharm
(free with a student email) for development since it will allow you to easily work on both at once. VSCode
is also a good option.

### Backend

The backend is a python django application. Python 3.5 or higher is required. In the root of the repository (this directory), create a virtual
environment with `python -m venv venv` and activate with `source venv/bin/activate`. Install the python
dependencies with `pip install -r requirements.txt`. To set up the development database and run the server, first
`cd backend` then run `python manage.py migrate`, and `python manage.py runserver`. To run the tests, use
`python manage.py test`.

### Frontend

The frontend client is a React application written in Typescript. It follows the "create-react-app" boilerplate,
so see the generated README in the frontend directory for more details. To build and serve the app locally, NodeJS is
required, and Yarn is recommended to install dependencies although npm will work fine. While the backend server
is running, `cd frontend` and use `npm install` or `yarn install` to download dependencies. `npm start` will launch
the development server which builds and serves the site. All the application code is located under `src`,
while `public` simply contains the html page where the app will be mounted.