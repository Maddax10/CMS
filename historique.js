
const apiUrl = "https://api-nodejs-e6am.onrender.com/api";



const reloadHistoric = () => {

  const historic_tbody = document.querySelector("#historic_tbody");
  historic_tbody.innerHTML = "";
  //récupérer les visiteurs présents
  //Récupérer le local de la formation pour chaque visiteur
  fetch(apiUrl + "/visitors/historic")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        //Récupérer le local pour la formation ou pour le personnel si motif = "visite" ou "formation"
        if (element.motif_visitors === "visite") {
          console.log("récup le local du personnels")
          fetch(`${apiUrl}/personnels/local/${element.detail_visitors}`)
            .then(response => response.json())
            .then(local => {
              element.local_personnels = local[0].local_personnels;
              //insérer les données dans le tableau formations
              historic_tbody.innerHTML +=
                `<tr data-id_personnels="${element.id_personnels}">
                  <td>${element.name_visitors}</td>
                  <td>${element.firstname_visitors}</td>
                  <td>${element.motif_visitors}</td>
                  <td>${element.detail_visitors}</td>
                  <td>${element.arrival_visitors}</td>
                  <td>${element.departure_visitors}</td>
                  <td>${element.local_personnels}</td>
                </tr>`;
            })
        }
        else if (element.motif_visitors === "formation") {
          console.log("récup le local du personnels")
          fetch(`${apiUrl}/formations/local/${element.detail_visitors}`)
            .then(response => response.json())
            .then(local => {
              element.local_formation = local[0].local_formation;
              //insérer les données dans le tableau formations
              historic_tbody.innerHTML +=
                `<tr data-id_personnels="${element.id_personnels}">
                  <td>${element.name_visitors}</td>
                  <td>${element.firstname_visitors}</td>
                  <td>${element.motif_visitors}</td>
                  <td>${element.detail_visitors}</td>
                  <td>${element.arrival_visitors}</td>
                  <td>${element.departure_visitors}</td>
                  <td>${element.local_formation}</td>
                </tr>`;
            })

        }


      });
    })
}



reloadHistoric();