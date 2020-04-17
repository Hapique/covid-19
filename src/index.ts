mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFwaXF1ZSIsImEiOiJjazkyMGQwM2EwMndtM2RwbmE5Mjh0MzRrIn0.nosH7NbDxJ7ecwVqc_yFbg";

document
  .querySelector("button")
  ?.addEventListener("click", () =>
    document.querySelector("#help")?.classList.remove("is-active")
  );

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  minZoom: 2,
});

map.on("load", async () => {
  const countries = await (
    await fetch("https://api.covid19api.com/summary")
  ).json();

  if (window.localStorage.getItem("countriesInfo") === null) {
    const countriesInfo = await (
      await fetch("https://restcountries.eu/rest/v2/all")
    ).json();
    window.localStorage.setItem("countriesInfo", JSON.stringify(countriesInfo));
  }

  map.addLayer({
    id: "countries",
    source: {
      type: "vector",
      url: "mapbox://byfrost-articles.74qv0xp0",
    },
    "source-layer": "ne_10m_admin_0_countries-76t9ly",
    type: "fill",
    paint: {
      "fill-color": "rgba(200, 100, 240, 0.4)",
      "fill-outline-color": "rgba(200, 100, 240, 1)",
    },
  });

  map.on("click", "countries", (mapElement) => {
    const countryCode = mapElement?.features![0].properties?.ISO_A2;
    const info = countries["Countries"].find(
      (i: any) => i.CountryCode === countryCode
    );
    const countriesInfo = window.localStorage.getItem("countriesInfo");
    if (countriesInfo) {
      const country = JSON.parse(countriesInfo).find(
        (i: any) => i.alpha2Code === countryCode
      );
      const html = `
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="${country.flag}" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p><strong>${country.name}</strong></p>
              <ul>
                <li><strong>Cases:</strong> ${info.TotalConfirmed}</li>
                <li><strong>Deaths:</strong> ${info.TotalDeaths}</li>
                <li><strong>Recoveries:</strong> ${info.TotalRecovered}</li>
              </ul>
            </div>
          </div>
        </article>
        `;
      new mapboxgl.Popup()
        .setLngLat(mapElement.lngLat)
        .setHTML(html)
        .addTo(map);
    }
  });
});
