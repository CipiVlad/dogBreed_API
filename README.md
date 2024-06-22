# Dog Breed App

## Idea
- create a small app using React.js, Typescript and Material UI. The app will allow users to view an image gallery of their favorite dog breeds using the [DOG API](https://dog.ceo/dog-api/). 

## Tasks
- [x] integrate the dog api to fetch and display images of selected dog breeds
- [] implement a user interface with Material UI that allows users to select one or more dog breeds
- [] display images of the selected breeds in a gallery format

## App Structure
- route: "/"
    - get a card list with: 
        a) one bg-img of random breed
        b) app-bar including: heart-icon and breed name
        c) click on heart for selecting favorite breed(s)
        d) click on bg-img to move on to BreedDetail with Gallery pics of breed
        e) click on button "create gallery" for creating a gallery of chosen breeds

- route: "/breed/:hound"
    - i.e. /breed/affenpinscher
    shows BreedDetail in Gallery

- route: "/gallery"
    - show a gallery of chosen breeds