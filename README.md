# Public Api app

This is Webapp which is using the freeapi.api api for fetching the data using the React
App fetch the data from the api and render it on the app.

# Api response

Api response is tested using the postman to use the api effeciently and help to understanding the different api response and data points.
Data is fetched from the product and books api.

# Custom Hook

Data is fetched by using the custom hook "UseFecth" which fetch the data from different apis effciently.
It makes the fetching of the data effeciently and smooth and makes to save lot of reultiliazation of same code across the app.

# Components

Created the seperate components for the Header,Product, Book, Search, Category, Cart.
Each and every component has it own functionality and usage.
It's make easy to render the differenet item from the based on api response.

# Context Api

Levearaing the context api from the react to create the necessary states and functions which can be used across the app to render the app effeciently.

# Layouts

Defines the seperate app layout for the app to render the data effeciently and responsive across the device.

# SearchBar

SearchBar component use to allow the search functionality in the app, allowing to search the product and book based on the search type.
It search for the product api if user is search something from the product page or search from book api if user is searching from the book page.

# Pages

The separate pages for the separate the api response type.
Render the item in the page effeceintly for the different api response.

# Dynamic SerachPage

This page display the result from the product api or book api based on the where the search request is comming from product page or book page.
It render the api response effeceintly to tha page based on the search request incoming from the product page or book page.

# Dynamic CategoryPage

This page display the result from the product api or book api based on the from where the category request is comming from product page or book page.
It render the api response effeceintly to tha page based on the category request incoming from the product page or book page.

# Cart Functionality

Cart component to store the ids of the item which is added to cart.
It effeciently store and dislay's the item count in the cart array.

# View CartPage

View CartPage display the items dynamically from the type of the item which is book or product.
It should fetched the data from the book api or product api based on it's type and render it effeciently on the page.
It allow the update the qauntity of the item in the cart dynamically.
It update the cart array based on the item's updated quantity.

# Routes

Defines the specific routes for each and every page in the app to effeciently navigate and propogate the api response on the page.

# Styling

Style the whole app in tailwind css to effeciently beautify the look and feel.
