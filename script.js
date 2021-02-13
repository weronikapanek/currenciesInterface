const favlist = document.querySelector(".list");


function renderCurrency(name, bid, ask) {
  const favButton = createAddFavoriteButton(name, bid, ask);
  const currencyWrapper = document.createElement("div");
  currencyWrapper.className = "ratesList";
  currencyWrapper.textContent = `${name} ${bid} ${ask}`;
  currencyWrapper.appendChild(favButton);

  document.querySelector("#app").appendChild(currencyWrapper);
}

function setupApp() {
  fetch("http://api.nbp.pl/api/exchangerates/tables/C/")
    .then((response) => {
      if (!response.ok) {
        throw Error("Error is here, try to fix it ASAP");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((table) => {
        table.rates.forEach((rate) => {
          renderCurrency(rate.currency, rate.bid, rate.ask);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

setupApp();