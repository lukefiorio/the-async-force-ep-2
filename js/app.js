'use strict';

function getResources() {
  const swapi = 'https://swapi.co/api/';
  let attr1 = document.createElement('h2');
  let attr2 = document.createElement('p');
  let attr3 = document.createElement('p');
  contentContainer.appendChild(attr1);
  contentContainer.appendChild(attr2);
  contentContainer.appendChild(attr3);

  if (resourceType.value === 'people') {
    function peopleXmlListener() {
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
      attr1.innerHTML = JSON.parse(this.responseText).name;
      attr2.innerHTML = JSON.parse(this.responseText).terrain;
      attr3.innerHTML = JSON.parse(this.responseText).population;

      let filmsArray = JSON.parse(this.responseText).films;
      const filmList = document.createElement('li');
      filmList.innerHTML = 'Referenced in:';
      contentContainer.appendChild(filmList);

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
    // do work
  }
}

requestResourceButton.addEventListener('click', getResources);
