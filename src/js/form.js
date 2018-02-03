import axios from 'axios';


function form() {
  var findMyPartyBtn = document.querySelector(".find-my-party button");
  var firstName = document.querySelector("#first-name");
  var lastName = document.querySelector("#last-name");
  var nameTab = document.querySelector(".name-tab");
  var partiesTab = document.querySelector(".parties-tab");
  var rsvpTab = document.querySelector(".rsvp-tab");

  findMyPartyBtn.addEventListener("click", function() {
    axios.post('/user', {
      firstName: firstName.value,
      lastName: lastName.value
    })
    .then(function (response) {
      console.log(response);
      renderParties();
    })
    .catch(function (error) {
      renderPartiesError();
    });

    nameTab.style.display = "none";
    partiesTab.style.display = "block";
  });

  function renderParties() {
    var partiesTab = document.querySelector(".parties-tab");
    var errorMessage = document.createElement('p');
    errorMessage.textContent += "Choose your Party";

    partiesTab.appendChild();
  }

  function renderPartiesError () {
    var partiesTab = document.querySelector(".parties-tab");
    var errorMessage = document.createElement('p');
    errorMessage.textContent += "There was a connection error. Please try again later.";

    partiesTab.appendChild(errorMessage);
  }





  // var currentTab = 0; // Current tab is set to be the first tab (0)
  // showTab(currentTab); // Display the current tab
  // var prevButton = document.querySelector("#prevBtn");
  // var nextButton = document.querySelector("#nextBtn");

  // prevButton.addEventListener("click", function() {
  //   nextPrev(-1);
  // });

  // nextButton.addEventListener("click", function() {
  //   nextPrev(1);
  // });

  // function showTab(n) {
  //   var x = document.getElementsByClassName("tab");
  //   var prevButton = document.querySelector("#prevBtn");
  //   var nextButton = document.querySelector("#nextBtn");
  //   x[n].style.display = "block";

  //   if (n == 0) {
  //     // prevButton.style.display = "none";
  //   } else {
  //     // prevButton.style.display = "inline";
  //   }
  //   if (n == (x.length - 1)) {
  //     // nextButton.innerHTML = "Submit";
  //   } else if (n == 0) {
  //     // nextButton.innerHTML = "Find My Party";
  //   } else {
  //     // nextButton.innerHTML = "Next";
  //   }
  //   // fixStepIndicator(n);
  // }

  // function nextPrev(n) {
  //   // This function will figure out which tab to display
  //   var x = document.getElementsByClassName("tab");
  //   // Exit the function if any field in the current tab is invalid:
  //   if (n == 1 && !validateForm()) return false;
  //   // Hide the current tab:
  //   x[currentTab].style.display = "none";

  //   // if (currentTab == 0) {
  //   //   // document.getElementById("regForm").submit();

  //   // }

  //   // Increase or decrease the current tab by 1:
  //   currentTab = currentTab + n;
  //   // if you have reached the end of the form... :
  //   if (currentTab >= x.length) {
  //     //...the form gets submitted:
  //     // document.getElementById("regForm").submit();
  //     return false;
  //   }

  //   // Otherwise, display the correct tab:
  //   showTab(currentTab);
  // }

  // function validateForm() {
  //   // This function deals with validation of the form fields
  //   var x, y, i, valid = true;
  //   x = document.getElementsByClassName("tab");
  //   y = x[currentTab].getElementsByTagName("input");
  //   // A loop that checks every input field in the current tab:
  //   for (i = 0; i < y.length; i++) {
  //     // If a field is empty...
  //     if (y[i].value == "") {
  //       // add an "invalid" class to the field:
  //       y[i].className += " invalid";
  //       // and set the current valid status to false:
  //       valid = false;
  //     }
  //   }
  //   // If the valid status is true, mark the step as finished and valid:
  //   if (valid) {
  //     document.getElementsByClassName("step")[currentTab].className += " finish";
  //   }
  //   return valid; // return the valid status
  // }

  // function fixStepIndicator(n) {
  //   // This function removes the "active" class of all steps...
  //   var i, x = document.getElementsByClassName("step");
  //   for (i = 0; i < x.length; i++) {
  //     x[i].className = x[i].className.replace(" active", "");
  //   }
  //   //... and adds the "active" class to the current step:
  //   x[n].className += " active";
  // }
}

export default form;