# CINEREACT

We created a simple React App to store movies, get informations on it, get the last well-rated releases and save the favorites movies.

## How we made CINEREACT

CINEREACT was made with React JS for sure ;) Using rooting method, our application don't change his URL when you walk away on it. 

We plugged on themoviedb.rg with its API. We used Firebase to store favorites.
ES6, Bootstrap, JSX, HTML5 and CSS 3 are here too.

## Table of contents

1.  [Files structure](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Structure)
2.  [Installation](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Installation)
3.  [Credits](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Credits)


## Structure

```
*root*
|
├── *Node_modules*
├── */Public/*
├── */src/*
│     └── */Components/* 
│       |        └── Actuality
│       |               ├── Actuality.jsx
│       │               └── Actuality.css  
│       |        └── Favoris
│       |               ├── Favoris.jsx
│       │               └── Favoris.css 
│       |        └── Navbar
│       |               ├── Navbar.jsx
│       │               └── Navbar.css
│       |        └── Search
│       |               ├── Search.jsx
│       │               └── Search.css
│       |          
│       ├── App.css
│       ├── App.jsx
│       ├── *index.jsx* javascript entry point
│       └── *index.css*  
├── *.gitignore*
├── *package-lock.json*
├── *package.json*
└── *README.md* this file
```


## Installation

You can use both npm or yarn, the versions I used to create this project are:

```
$ node -v ; npm -v 
v8.12.0
6.4.1

```

If you just freshly installed yarn/npm you are good to go, else you might need to upgrade, for npm I use  `n`

```
npm install -g n

```

to install it and after that select at least the stable version (what I used).

```
n stable

```

and now you have the latest stable version of node&npm.

`npm start`  to start dev server with hot reload, it's live on  `localhost:3000`.



## Credits

The CLAP Team created this! 

Collaborators:

-   Maeva Duran (https://github.com/mae-va)
-   Tiphaine Deswarte (https://github.com/TiphaineDSW)
-   Antoine Nourris (https://github.com/awcs)
-   Matthieu PETIT (https://github.com/MatPlume)


This program is a free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation. 