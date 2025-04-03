// llamar a la api https://restcountries.com/v3/all y cargar el DOM
const apiCountries = `https://restcountries.com/v3.1/all`;
const countriesList = document.getElementById(`countries-list`);

const getCountries = async () => {
    try {
        const response = await fetch(apiCountries);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
    }catch(error){
        console.log(`Error: `, error);
    }
}


// mostrar las banderas en el html
const template = (countries) => {
    countriesList.innerHTML = ""; 

    countries.forEach((countrie) => {
        let countryCard = document.createElement("div");
        countryCard.classList.add("country-card");

        countryCard.innerHTML = `
            <img src="${countrie.flags.png}" alt="Bandera de ${countrie.name.common}">
            <div>
                <h2>${countrie.name.common}<h2>
            </div>
        `;
        // crea el evento al hacer click a la card
        countryCard.addEventListener("click", () => countrieInfo(countrie));
        countriesList.appendChild(countryCard);
    });
};


//ventana emergente del pais detallado
const countrieInfo = (countrie) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img src="${countrie.flags.png}" alt="Bandera de ${countrie.name.common}">
            <h2>${countrie.name.common}</h2>
            <ul>
                <li><strong>Capital:</strong> ${countrie.capital ? countrie.capital[0] : "N/A"}</li>
                <li><strong>Población:</strong> ${countrie.population.toLocaleString()}</li>
                <li><strong>Lado de conducción:</strong> ${countrie.car ? countrie.car.side : "N/A"}</li>
            </ul>
        </div>
    `;

    document.body.appendChild(modal);

    
    modal.querySelector(".close-btn").addEventListener("click", () => modal.remove());
};

getCountries().then((data) => {
    if (data) template(data);
});

