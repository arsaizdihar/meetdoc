# MeetDoc Web
Fullstack web using **Python Flask** as Backend and **React** as Frontend

[Frontend Web](https://meetdoc.netlify.app/)

[API Web](https://meet-doc.herokuapp.com)
 
## Flask (Backend)
### Tools & Libraries

 - [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/) with Heroku Postgresql
 - [Flask-CORS](https://flask-cors.readthedocs.io/) (to handle cross origin request from frontend)
 - [Flask-WTForm](https://flask-wtf.readthedocs.io/) (to handle form validation)

### Authentication
Using [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/en/stable) library to authenticate user by JWT. Token stored in httponly Cookie with X-CSRF double submit token. Access token expired in 1 hour and refresh token expired in 1 month. 

## React (Frontend)
### Tools & Libraries

 - [Tailwind CSS](https://tailwindcss.com/) (Framework)
 - [Headlessui-React](https://headlessui.dev/react/) (for disclosure nav, dropdown menu, modals, and transitions)
 - [Fontawesome](https://fontawesome.com/) (Icon)
 - [Axios](https://github.com/axios/axios) (fetch library)


### Authentication
Store access token and refresh token in httponly Cookie (automatically by the server) and store X-CSRF double submit token in local storage.
