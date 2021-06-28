window.onload = (ev) => {
    let source = "https://swapi.dev/api/planets/";

    const updatePlanetList = () =>{
        const planetList = document.getElementById('planets-table-list');
        planetList.innerHTML = ''

        fetch(source).then((response) => response.json()).then((data) => {
            data.results.forEach(result => {
                const row = document.createElement('tr');
                planetList.appendChild(row);
                row.innerHTML =
                 `<td>${result.name}</td>
                  <td>${result.diameter !== 'unknown'? new Intl.NumberFormat('ro-RO').format(result.diameter)+ ' km' : 'unknown' }</td>
                  <td>${result.climate}</td>
                  <td>${result.terrain}</td>
                  <td>${result.surface_water !== 'unknown' ? result.surface_water + '%' : 'unknown'}</td>
                  <td>${result.population !== 'unknown' ? new Intl.NumberFormat('ro-RO').format(result.population)+ ' people' : 'unknown'}</td>
                  <td>
                    <button type="button" class="${result.residents.length === 0 ? "btn btn-outline-light disabled" : "btn btn-outline-warning"}">
                            ${result.residents.length === 0 ? 'No known residents' : result.residents.length + ' resident(s)'}
                    </button>
                  </td>`;
            })
        })
    }

    const choosePage = () => {
        const buttons = document.querySelectorAll('#btn-next, #btn-previous');
        for (let button of buttons) {
            button.addEventListener("click", (event) => {
                if (!event.detail || event.detail === 1) {
                    fetch(source).then((response) => response.json()).then((data) => {
                        if (data.next && (button.id === 'btn-next')) {
                            source = data.next;
                            updatePlanetList();
                        }
                        if (data.previous && (button.id === 'btn-previous')) {
                            source = data.previous;
                            updatePlanetList();
                        }
                    })
                }
            })
        }
    };

    updatePlanetList()
    choosePage()
}