import axios from 'axios';

function form() {
  var findMyPartyBtn = document.querySelector(".find-my-party button");
  var firstName = document.querySelector("#first-name");
  var lastName = document.querySelector("#last-name");
  var nameTab = document.querySelector(".name-tab");
  var rsvpsTab = document.querySelector(".rsvp-tab");
  var loadingTab = document.querySelector(".loading-tab");

  findMyPartyBtn.addEventListener("click", function(event) {
    var isFirstNameValid = firstName.validity.valid;
    var isLastNameValid = lastName.validity.valid;

    if (!isFirstNameValid) {
      firstName.classList.add("invalid");
      event.preventDefault();
      return;
    }
    if (!isLastNameValid) {
      lastName.classList.add("invalid");
      event.preventDefault();
      return;
    }

    getPersonByName();
    // axios.post('/user', {
    //   firstName: firstName.value,
    //   lastName: lastName.value
    // })
    // .then(function (response) {
    //   console.log(response);
    //   renderRSVPs();
    // })
    // .catch(function (error) {
    //   renderRSVPsError();
    // });
    const loadingSpinner = require("../img/" + "dog_spinner.gif");
    console.log(loadingSpinner);
    var imageWrapper = document.createElement('div');
    var image = document.createElement('img');
    image.src = loadingSpinner;
    imageWrapper.appendChild(image);
    loadingTab.appendChild(imageWrapper);
    loadingTab.style.display = "block";
    nameTab.style.display = "none";
    // rsvpsTab.style.display = "block";
    event.preventDefault();
  });

  function getPersonByName() {
    var urlBase = 'https://dr63u9frob.execute-api.us-east-1.amazonaws.com/prod/persons';
    var fullUrl = urlBase + '?firstname=' + document.querySelector("#first-name").value +
                  "&lastname=" + document.querySelector("#last-name").value;

    axios.get(fullUrl)
      .then(function (response) {
        console.log("success return");
        console.log(response);
        var partyValid = isPartyValid(response);
        console.log(partyValid);
        if (partyValid) {getPartyByPerson(response.data[0].party_id);}
      })
      .catch(function (error) {
        loadingTab.style.display = "none";
        rsvpsTab.style.display = "block";
        console.log("error return");
        console.log(error);
        renderRSVPsError();
      });
  }

  function getPartyByPerson(partyId) {
    console.log('getPartyByPerson');
    var urlBase = 'https://dr63u9frob.execute-api.us-east-1.amazonaws.com/prod/parties/';
    var fullUrl = urlBase + partyId;

    axios.get(fullUrl)
      .then(function (response) {
        loadingTab.style.display = "none";
        rsvpsTab.style.display = "block";
        console.log("successss return");
        console.log(response);
        renderRSVPs(response);
      })
      .catch(function (error) {
        loadingTab.style.display = "none";
        rsvpsTab.style.display = "block";
        console.log("errorrr return");
        console.log(error);
        renderRSVPsError();
      });
  }

  function isPartyValid(response) {
    console.log(response.data);
    var rsvpsTab = document.querySelector(".rsvp-tab");
    var titleMessage = document.createElement('p');
    rsvpsTab.style.display = "block";

    // if (response.data.length != 0) {
      // titleMessage.textContent += "Choose your Party";
      // rsvpsTab.appendChild(titleMessage);
    if (response.data.length == 0) {
      titleMessage.textContent += "No party found with entered name. Did you misspell? If not, contact us at stephmat2018@gmail.com";
      var tryAgainButtonWrapper = document.createElement('div');
      var tryAgainButton = document.createElement('button');
      tryAgainButtonWrapper.appendChild(tryAgainButton);
      tryAgainButtonWrapper.className = "try-again-button";
      tryAgainButton.innerHTML = "Search Again";
      tryAgainButton.addEventListener('click', function () {
        nameTab.style.display = "block";
        rsvpsTab.style.display = "none";
        while (rsvpsTab.firstChild) {
          rsvpsTab.removeChild(rsvpsTab.firstChild);
        }
      });

      rsvpsTab.appendChild(titleMessage);
      rsvpsTab.appendChild(tryAgainButtonWrapper);
    }
    return !(response.data.length == 0);
  }

  function renderRSVPs(response) {
    console.log("renderRSVPs");
    if (response.data.length != 0) {
      var titleMessage = document.createElement('h2');
      titleMessage.textContent += "Party of " + parseInt(response.data.party.length);
      console.log(response.data.party.length);

      rsvpsTab.appendChild(titleMessage);
      response.data.party.forEach(function(person) {
        renderPersonRSVPInputs(person);
      });
      var buttonWrapper = document.createElement('div');
      buttonWrapper.className = "submit-rsvp";
      var button = document.createElement('button');
      button.textContent = "Send RSVP";
      button.className = "primary-button";
      buttonWrapper.appendChild(button);
      rsvpsTab.appendChild(buttonWrapper);
    } else {
      renderRSVPsError();
    }
  }

  function renderPersonRSVPInputs(person) {
    console.log("renderPersonRSVPInputs");
    var rsvpsTab = document.querySelector(".rsvp-tab");
    var div = document.createElement('div');
    var rsvpTemplate = require("../templates/rsvp.handlebars");
    var context = {firstname: person.first_name, lastname: person.last_name};

    div.innerHTML = rsvpTemplate(context);
    rsvpsTab.appendChild(div);
  }

  function renderRSVPsError () {
    var rsvpsTab = document.querySelector(".rsvp-tab");
    var errorMessage = document.createElement('p');
    errorMessage.textContent += "There was a connection error. Please try again later.";

    rsvpsTab.appendChild(errorMessage);
  }

  document.addEventListener('blur', function (event) {
      if (event.target .form == null) {
        return;
      }
      // Only run if the field is in a form to be validated
      if (!event.target.classList.contains('validate')) return;

      // Validate the field
      var error = event.target.validity;
      // console.log(error);
      if (!error.valid) {
        event.target.classList.add("invalid");
      } else {
        event.target.classList.remove("invalid");
      }
  }, true);
}

export default form;