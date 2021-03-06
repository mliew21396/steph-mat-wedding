import axios from 'axios';

function form() {
  var modal = document.querySelector("#modal");
  var modalCover = document.querySelector("#modal-cover");
  var body = document.querySelector("body");
  var rsvpsForm = document.querySelector(".rsvp-form");
  var findMyPartyBtn = document.querySelector(".find-my-party button");
  var firstName = document.querySelector("#first-name");
  var lastName = document.querySelector("#last-name");
  var nameTab = document.querySelector(".name-tab");
  var rsvpsTab = document.querySelector(".rsvp-tab");
  var loadingTab = document.querySelector(".loading-tab");
  var loadingImage = document.querySelector(".loading-tab img");
  var thankYouTab = document.querySelector(".thank-you-tab");

  setup();

  function setup() {
    const loadingSpinner = require("../img/" + "dog_spinner.gif");
    loadingImage.src = loadingSpinner;

    rsvpsForm.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    findMyPartyBtn.addEventListener("click", function(event) {
      var firstNameValid = firstName.validity.valid;
      var lastNameValid = lastName.validity.valid;

      if (!firstNameValid) {
        firstName.classList.add("invalid");
        event.preventDefault();
        return;
      }
      if (!lastNameValid) {
        lastName.classList.add("invalid");
        event.preventDefault();
        return;
      }

      getPersonByName(firstName, lastName);

      loadingTab.style.display = "block";
      nameTab.style.display = "none";
      event.preventDefault();
    });

    nameTab.addEventListener('blur', function (event) {
        if (event.target .form == null) {
          return;
        }
        if (!event.target.classList.contains('validate')) return;

        var error = event.target.validity;
        if (!error.valid) {
          event.target.classList.add("invalid");
        } else {
          event.target.classList.remove("invalid");
        }
    }, true);
  }

  function getPersonByName(firstName, lastName) {
    var urlBase = 'https://dr63u9frob.execute-api.us-east-1.amazonaws.com/prod/persons';
    var fullUrl = urlBase +
                  "?firstname=" + firstName.value +
                  "&lastname=" + lastName.value;

    axios.get(fullUrl)
      .then(function (response) {
        if (isPartyValid(response)) {
          if (response.data[0].attending != undefined) {
            renderAlreadyRsvpedDisplay();
          } else {
            getPartyByPerson(response.data[0].party_id);
          }
        } else {
          renderTryAgainDisplay();
        }
      })
      .catch(function (error) {
        renderRSVPsError();
      });
  }

  function renderAlreadyRsvpedDisplay() {
    var titleMessage = document.createElement('p');
    var closeButtonWrapper = document.createElement('div');
    var closeButton = document.createElement('button');
    closeButton.classList.add('waves-effect', 'waves-light', 'btn');

    rsvpsForm.textContent = '';

    loadingTab.style.display = 'none';
    titleMessage.textContent += "You've already RSVPed. If you need to contact us, email at stephmat2018@gmail.com.";
    rsvpsTab.style.display = 'block';
    closeButtonWrapper.appendChild(closeButton);
    closeButtonWrapper.className = 'already-rsvped-button';
    closeButton.innerHTML = "Close";
    closeButton.focus();

    closeButton.addEventListener('click', function () {
      closeFormModal();
    });

    rsvpsForm.appendChild(titleMessage);
    rsvpsForm.appendChild(closeButtonWrapper);
  }

  function closeFormModal() {
    nameTab.style.display = "block";
    rsvpsTab.style.display = "none";
    thankYouTab.style.display = "none";

    modal.classList.add("closed");
    modalCover.classList.add("closed");
    body.style.overflow = "visible";
  }

  function getPartyByPerson(partyId) {
    var urlBase = 'https://dr63u9frob.execute-api.us-east-1.amazonaws.com/prod/parties/';
    var fullUrl = urlBase + partyId;

    axios.get(fullUrl)
      .then(function (response) {
        loadingTab.style.display = "none";
        rsvpsTab.style.display = "block";
        renderRSVPs(response);
      })
      .catch(function (error) {
        renderRSVPsError();
      });
  }

  function isPartyValid(response) {
    var isEmpty = (response.data.length == 0);
    return !isEmpty;
  }

  function renderTryAgainDisplay() {
    var titleMessage = document.createElement('p');
    var tryAgainButtonWrapper = document.createElement('div');
    var tryAgainButton = document.createElement('button');

    rsvpsForm.textContent = '';

    loadingTab.style.display = "none";
    titleMessage.textContent += "No party found with entered name. Did you misspell? For questions, contact stephmat2018@gmail.com";
    rsvpsTab.style.display = "block";
    tryAgainButtonWrapper.appendChild(tryAgainButton);
    tryAgainButtonWrapper.className = "try-again-button";
    tryAgainButton.innerHTML = "Search Again";
    tryAgainButton.classList.add('waves-effect', 'waves-light', 'btn');
    tryAgainButton.focus();

    tryAgainButton.addEventListener('click', function () {
      nameTab.style.display = "block";
      rsvpsTab.style.display = "none";
      while (rsvpsForm.firstChild) {
        rsvpsForm.removeChild(rsvpsForm.firstChild);
      }
    });

    rsvpsForm.appendChild(titleMessage);
    rsvpsForm.appendChild(tryAgainButtonWrapper);
  }

  function renderRSVPs(response) {
    if (response.data.party.length != 0) {
      while (rsvpsForm.firstChild) {
          rsvpsForm.removeChild(rsvpsForm.firstChild);
      }

      var title = document.createElement('h2');
      title.textContent += "Party of " + parseInt(response.data.party.length);
      rsvpsForm.appendChild(title);

      renderPersonsRsvpInputs(response);

      createRsvpValidationListeners();

      // TODO: create handle bar
      var buttonWrapper = document.createElement('div');
      buttonWrapper.className = "submit-rsvp";
      var button = document.createElement('button');
      button.textContent = "Send RSVP";
      button.className = "btn waves-effect waves-light";
      button.setAttribute('disabled','');
      button.setAttribute('type','submit');
      buttonWrapper.appendChild(button);
      button.addEventListener("click", function(event) {
        event.preventDefault();

        response.data.party.forEach(function(person) {
          postPersonRSVP(person);
        });
        rsvpsTab.style.display = "none";
        thankYouTab.style.display = "block";
      });
      rsvpsForm.appendChild(buttonWrapper);

    } else {
      renderRSVPsError();
    }
  }

  function createRsvpValidationListeners() {
    var formInputs = rsvpsForm.querySelectorAll('.rsvp-form input:not([type=hidden])');

    for (var i=0; i < formInputs.length; i++) {
      createRsvpValidationListener(formInputs[i]);
    }
  }

  function createRsvpValidationListener(formInput) {
    formInput.addEventListener('change', function(event) {
      if (isRsvpValid()) {
        enableSubmitButton();
      } else {
        disableSubmitButton();
      }
    });
  }

  function isRsvpValid() {
    var rsvpInputFieldWrappers = rsvpsForm.querySelectorAll('.row:not(.closed)');

    for (var i=0; i < rsvpInputFieldWrappers.length; i++) {
      if(!isRsvpInputFieldWrapperValid(rsvpInputFieldWrappers[i])) {
        return false;
      }
    }
    return true;
  }

  function isRsvpInputFieldWrapperValid(rsvpInputFieldWrapper) {
    var rsvpInputFields = rsvpInputFieldWrapper.querySelectorAll('.field');

    for (var j=0; j < rsvpInputFields.length; j++) {
      if (!isRsvpInputFieldValid(rsvpInputFields[j])) {
        return false;
      }
    }
    return true;
  }

  function isRsvpInputFieldValid(rsvpInputField) {
    var rsvpInputs = rsvpInputField.querySelectorAll('input');

    for (var k=0; k < rsvpInputs.length; k++) {
      if (rsvpInputs[k].checked) {
        return true;
      }
    }
    return false;
  }

  function enableSubmitButton() {
    document.querySelector('.submit-rsvp button').removeAttribute('disabled');
  }

  function disableSubmitButton() {
    document.querySelector('.submit-rsvp button').setAttribute('disabled','');
  }

  function postPersonRSVP(person) {
    var urlBase = 'https://dr63u9frob.execute-api.us-east-1.amazonaws.com/prod/persons/';
    var fullUrl = urlBase + person.person_id;

    axios.post(fullUrl, createPostBody(person))
    .then(function (response) {
      renderThankYou();
    })
    .catch(function (error) {
      renderPostFail();
    });
  }

  function createPostBody(person) {
    var attendingValue = document.querySelector('input[name="attending-' +
                          person.person_id +
                          '"]:checked').nextElementSibling.textContent;
    if (attendingValue == "No") {
      return {"attending":attendingValue};
    }
    var entreeValue = document.querySelector('input[name="entree-' +
                        person.person_id +
                        '"]:checked').nextElementSibling.textContent;
    return {
      "attending":attendingValue,
      "entree":entreeValue
    };
  }

  function renderThankYou() {
    thankYouTab.addEventListener('click', function () {
      closeFormModal();
    });
  }

  function renderPostFail() {
    thankYouTab.querySelector('p').innerHTML = "Failed to send. Please contact stephmat2018@gmail.com";
  }

  function renderPersonsRsvpInputs(response) {
    response.data.party.forEach(function(person) {
      renderPersonRsvpInputs(person);
    });
  }

  function renderPersonRsvpInputs(person) {
    var div = document.createElement('div');
    var rsvpTemplate = require("../templates/rsvp.handlebars");
    var context = {
                    firstname: toTitleCase(person.first_name),
                    lastname: toTitleCase(person.last_name),
                    personid: person.person_id,
                    child: person.child
                  };


    div.className = 'person';
    div.innerHTML = rsvpTemplate(context);
    rsvpsForm.appendChild(div);

    createPersonRsvpInputsListeners(person);
  }

  function createPersonRsvpInputsListeners(person) {
    var attendingInputs = document.querySelectorAll('input[name="attending-' + person.person_id + '"]');
    attendingInputs.forEach(function(attendingInput){
      createPersonRsvpInputsListener(attendingInput, person);
    });
  }

  function createPersonRsvpInputsListener(attendingInput, person) {
    attendingInput.addEventListener('change', function (event) {
      var selected = attendingInput.nextElementSibling.textContent;
      var toggleable = document.querySelector('.entree-' + person.person_id);
      toggleable.classList.toggle('closed', selected == 'No');
    });
  }

  function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function renderRSVPsError () {
    var errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.textContent += 'There was a connection error. Please try again later.';

    if (rsvpsTab.getElementsByClassName('error').length !== 0) {
      rsvpsTab.getElementsByClassName('error').remove();  
    }

    rsvpsTab.appendChild(errorMessage);
    loadingTab.style.display = 'none';
    rsvpsTab.style.display = 'block';
  }
}

export default form;