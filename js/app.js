//variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');
      clearCartBtn = document.querySelector('#clear-cart');


//listeners

loadEventListeners();

function loadEventListeners() {
    //adding course to cart
    courses.addEventListener('click', buyCourse) 
    
    //when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //clear cart button
    clearCartBtn.addEventListener('click', clearCart);

    //Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


//functions
function buyCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')) {
        
        const course = e.target.parentElement.parentElement;

        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    //insert into the shopping cart
    addIntoCart(courseInfo);
}

//Display the selected course into the shopping cart
function addIntoCart(course) {
    //create a <tr>
    const row = document.createElement('tr');
    //build the template 
    row.innerHTML =    `
        <tr>
            <td> 
                <img src="${course.image}" width=100>  
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into storage

    saveIntoStorage(course);
}

//add the courses  into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    // convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses) );
}

// get the contents from storage
function getCoursesFromStorage() {

    let courses;
    //if something exist on storage get the value, else create an empty array
    if(localStorage.getItem('courses') === null){
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses') );
    }
    return courses;
}

//remove course from the dom
function removeCourse(e) {

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}
// clears the cart
function clearCart(e) {
    e.preventDefault();
    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //clear from local storage
    clearLocalStorage();
}
// clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}
// Loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // LOOP through the courses and print into the cart
    coursesLS.forEach(function(course){
        // create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
        <tr>
            <td> 
                <img src="${course.image}" width=100>  
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
        `;
        shoppingCartContent.appendChild(row);
    }) 
}