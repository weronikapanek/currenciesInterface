const favList = document.querySelector(".list");

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  if (window.confirm("Are u sure you want to clear the list?")) {
    window("", favList.textContent = "");
  }
});

const themeSwitchButton = document.querySelector(".mode");
themeSwitchButton.addEventListener("click", () => {
  const body = document.querySelector("body");
  body.classList.toggle("dark-mode");
});

function createAddFavoriteButton(name, bid, ask) {
  const favButton = document.createElement("button");
  favButton.className = "favbutton";
  favButton.textContent = "⭐";
  favButton.addEventListener("click", () => {
    const favCurrency = document.createElement("div");
    favCurrency.className = "ratesList";
    favCurrency.textContent = `${name} ${bid} ${ask}`;

    if (favList.textContent.includes(favCurrency.textContent)) {
      return window.alert("This currency has been already added");
    } else {
      const favCurrency = document.createElement("div");
      favCurrency.className = "favRatesList";
      favCurrency.textContent = `${name} ${bid} ${ask}`;
      favList.appendChild(favCurrency);

      const favCurrencyRemoveBtn = document.createElement("button");
      favCurrencyRemoveBtn.textContent = "X";
      favCurrencyRemoveBtn.className = "removeBtn";
      favCurrencyRemoveBtn.addEventListener("click", () => {
        favCurrency.remove();
      });
      favCurrency.appendChild(favCurrencyRemoveBtn);
    }
  });

  return favButton;
}

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

console.log(localStorage.setItem(favList, value));
