'use strict';

function getResources() {
  contentContainer.innerHTML = '';

  const displayError = function(status, response) {
    // remove attr1,2,3 (necessary due to hoisting)
    contentContainer.innerHTML = '';
    // create & append error message
    let error = document.createElement('h2');
    let errorDetail = document.createElement('p');
    error.innerHTML = 'Oops! Looks like something went wrong.';
    errorDetail.innerHTML = `error ${status}: ${JSON.parse(response).detail}`;
    contentContainer.appendChild(error);
    error.appendChild(errorDetail);
  };

  const swapi = 'https://swapi.co/api/';

  const attr1 = document.createElement('h2');
  const attr2 = document.createElement('p');
  const attr3 = document.createElement('p');
  contentContainer.appendChild(attr1);
  contentContainer.appendChild(attr2);
  contentContainer.appendChild(attr3);

  if (resourceType.value === 'people') {
    function peopleXmlListener() {
      if (this.status < 200 || this.status >= 300) {
        displayError(this.status, this.responseText);
        return;
      }

      attr1.innerHTML = JSON.parse(this.responseText).name;
      attr2.innerHTML = JSON.parse(this.responseText).gender;

      function speciesXmlListener() {
        attr3.innerHTML = JSON.parse(this.responseText).name;
      }

      const speciesXmlReq = new XMLHttpRequest();
      speciesXmlReq.addEventListener('load', speciesXmlListener);
      speciesXmlReq.open('GET', JSON.parse(this.responseText).species[0].toString());
      speciesXmlReq.send();
    }

    const peopleXmlReq = new XMLHttpRequest();
    peopleXmlReq.addEventListener('load', peopleXmlListener);
    peopleXmlReq.open('GET', swapi + resourceType.value + '/' + resourceId.value + '/');
    peopleXmlReq.send();
  } else if (resourceType.value === 'planets') {
    function planetXmlListener() {
      if (this.status < 200 || this.status >= 300) {
        displayError(this.status, this.responseText);
        return;
      }

      attr1.innerHTML = JSON.parse(this.responseText).name;
      attr2.innerHTML = JSON.parse(this.responseText).terrain;
      attr3.innerHTML = JSON.parse(this.responseText).population;

      const filmList = document.createElement('li');
      contentContainer.appendChild(filmList);
      let filmsArray = JSON.parse(this.responseText).films;
      filmList.innerHTML = 'Referenced in:';

      filmsArray.forEach((elem) => {
        function filmsXmlListener() {
          let attr = document.createElement('ul');
          filmList.appendChild(attr);
          attr.innerHTML = JSON.parse(this.responseText).title;
        }

        let filmsXmlReq = new XMLHttpRequest();
        filmsXmlReq.addEventListener('load', filmsXmlListener);
        filmsXmlReq.open('GET', elem);
        filmsXmlReq.send();
      });
    }

    const planetXmlReq = new XMLHttpRequest();
    planetXmlReq.addEventListener('load', planetXmlListener);
    planetXmlReq.open('GET', swapi + resourceType.value + '/' + resourceId.value + '/');
    planetXmlReq.send();
  } else if (resourceType.value === 'starships') {
    function starshipXmlListener() {
      if (this.status < 200 || this.status >= 300) {
        displayError(this.status, this.responseText);
        return;
      }

      attr1.innerHTML = JSON.parse(this.responseText).name;
      attr2.innerHTML = JSON.parse(this.responseText).manufacturer;
      attr3.innerHTML = JSON.parse(this.responseText).starship_class;

      const filmList = document.createElement('li');
      contentContainer.appendChild(filmList);
      let filmsArray = JSON.parse(this.responseText).films;
      filmList.innerHTML = 'Referenced in:';

      filmsArray.forEach((elem) => {
        function filmsXmlListener() {
          let attr = document.createElement('ul');
          filmList.appendChild(attr);
          attr.innerHTML = JSON.parse(this.responseText).title;
        }

        let filmsXmlReq = new XMLHttpRequest();
        filmsXmlReq.addEventListener('load', filmsXmlListener);
        filmsXmlReq.open('GET', elem);
        filmsXmlReq.send();
      });
    }

    const starshipXmlReq = new XMLHttpRequest();
    starshipXmlReq.addEventListener('load', starshipXmlListener);
    starshipXmlReq.open('GET', swapi + resourceType.value + '/' + resourceId.value + '/');
    starshipXmlReq.send();
  }
}

requestResourceButton.addEventListener('click', getResources);
