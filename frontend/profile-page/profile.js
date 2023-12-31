let globalID; 

const token = localStorage.getItem("token"); 


async function getUserId(token) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`https://sql-injectors.onrender.com/tokens/${token}`, options);

        if (response.status === 200) {
            const data = await response.json();
            
            // Assuming data is an integer value
            globalID = data;
            

            console.log("The user ID is:", globalID);
            return data;
        } else {
            console.log("Could not find a valid token");
            throw new Error("Invalid token");
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}


getUserId(token)
    .then(userId => {
        console.log('User ID:', userId);
        return userId;
    })
    .then(globalID => loadBookings(globalID)) // Pass the globalID value to loadBookings
    .catch(error => {
        console.error('Error:', error.message);
    });

  

async function loadBookings(id) {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    
     const response = await fetch(`https://sql-injectors.onrender.com/profile/${id}`, options)
     console.log(response)
     
        const bookings = await response.json();
        renderBookings(bookings);
}




//handles rendering the fetched bookings in the table.

function renderBookings(bookings) {
    const tableBody = document.querySelector("#bookingsTable tbody");

    tableBody.innerHTML = "";

    // Loop through bookings and create table rows
    bookings.forEach(booking => {
        const row = tableBody.insertRow();

    // Insert data into the row cells
    row.insertCell(0).innerText = booking.name;
    // row.insertCell(1).innerText = booking.classdate;
    row.insertCell(1).innerText = booking.classstart;
    row.insertCell(2).innerText = booking.venuename;

    const deleteButton = createDeleteButton(booking.id);
    const actionCell = row.insertCell(3);
    actionCell.appendChild(deleteButton);
    });
}

//creates a delete button for each booking.
function createDeleteButton(bookingId) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Cancel Booking";
    deleteButton.addEventListener("click", () => deleteBooking(bookingId));
    return deleteButton;
}


//handles the logic for sending a DELETE request to cancel a booking.

async function deleteBooking(bookingId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://sql-injectors.onrender.com/profile/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            'Authorization': token,
        }
    })
        .then(response => {
            if (response.ok) {
                // Remove the deleted row from the table
                alert("Booking deleted successfully");
                window.location.reload();
                const rowToDelete = document.querySelector(`#bookingsTable tbody tr[data-booking-id="${bookingId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                    
                }
            } else {
                console.error("Error deleting booking:", response.statusText);
            }
        })
        .catch(error => console.error("Error deleting booking:", error));
}


document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href('../home-page/home.html')
})


// Initial fetching and rendering when the page loads
loadBookings(globalID);
