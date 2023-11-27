const list = document.getElementById('list');





/* When the user clicks on the button,
 shows the dropdown content */
function myFunction() {
    
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      };
  }


  //code to filter dropdown list items based on user input
  function filterFunction() {
    let input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchFilter");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }


const showDropdown = document.querySelector("#myInput")
showDropdown.addEventListener("click", myFunction);


//This code initializes the date range picker using the jQuery library, allowing users to select date ranges.
$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });



function fetchClasses (){
    fetch("http://localhost:3000/class")
    .then(resp => resp.json())
    .then(data => displayClasses(data))
}

function displayClasses (data) {
 const classContainer= document.getElementById('classContainer');

 data.forEach(cls => {
    const classElement = document.createElement('div');
    classElement.innerHTML = `
    <h2>${cls.name}</h2>
    <p>Venue: ${cls.venue}</p>
    <p>Review: ${cls.review}</p>
    <img src="${cls.photo}" alt="Class Photo">
    <p>Date: ${cls.date}</p>
`;
classElement.classList.add('class-separator');
classContainer.appendChild(classElement);
  });
}

document.addEventListener('DOMContentLoaded', fetchClasses)