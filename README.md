## Redux / React Learning Project

This is a project I am using while learning Redux / React. The idea is a form that allows the user to
add multiple fields and their definitions. This is very much a learning tool, and I'm doing my best to 
make it understandable to others and be a tool for learning.

Thanks to Stephen Grider for his Udemy course, <https://www.udemy.com/react-redux/learn/v4/> which this
project draws from, greatly.

#### Notes

The **Application State** window in the application displays the actual state from all reducers live 
as it happens. The console also reports every action that happens.

#### Django support for hot reloading

As I worked on this project, I realized I was jumping through coding hoops to mimic a REST API, rather than
just having a sample one. To best mimic the project I'm eventually going to add this to, I've turned this project
into a hybrid React/Redux/Django application. It supports hot loading from Django (though an additional node
server must be run).

Thanks go to Owais Lone, for giving me something to base much of this off of: <http://owaislone.org/blog/webpack-plus-reactjs-and-django/>

## Installing

> **NOTE**: You'll most likely want to create a virtualenv to use for your installation. The remainder of these
> instructions assume that's what you're doing, and that any python commands are performed within that virtualenv.

> These instructions also assume that you already have the latest node.js installed.

#### Clone this repository

Clone this repository, and then `cd` into the repository's directory. 

#### Install Python Requirements

```
pip install -r requirements.txt
```

#### Install npm dependencies

```
npm install
```

## Starting things ups

#### Start Django

To start Django, open a terminal:

```
cd field_project
python manage.py runserver
```

#### Start node server

To enable hot reloading, a node server must be running to serve the hotly generated files. The start this, open a
separate terminal:

```
npm start
```

### Viewing the project

You should now be able to go to <http://localhost:8000/fields> and see the main page. Any changes made to the .js
files will be hot reloaded without restarting Django or Node.

### Running in Production

To run in production:

* In `field_project/redux_field_creator/settings.py`, set `DEBUG = True`
* Run `npm run build:prod`
* Restart your Django server with

> **Note**: There is no need to run a node server when running in production. There is no hot reloading occurring
and files are served statically.









