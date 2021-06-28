window.onload = function(ev){
    let source = "https://swapi.dev/api/planets/";

    function updatePlanetList() {
        const planetList = document.getElementById('planets-table-list');
        planetList.innerHTML = ''

        fetch(source).then((response) => response.json()).then((data) => {
            data.results.forEach(result => {
                const row = document.createElement('tr');
                planetList.appendChild(row);
                row.insertAdjacentHTML("afterbegin",
                    `<td>${result.name}</td>
                          <td>${result.diameter !== 'unknown'? result.diameter+ ' km' : 'unknown' }</td>
                          <td>${result.climate}</td>
                          <td>${result.terrain}</td>
                          <td>${result.surface_water !== 'unknown' ? result.surface_water + '%' : 'unknown'}</td>
                          <td>${result.population !== 'unknown' ? result.population+ ' people' : 'unknown'}</td>
                          `);
            })
        })
    }
    updatePlanetList()
}