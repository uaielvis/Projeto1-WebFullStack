document.getElementById('formPesquisa').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('query').value;
    var apiUrl = 'https://api.ksoft.si/lyrics/search?q=' + encodeURIComponent(query);

    var accessToken = '81b1f1d4411405cbb27e6a950cf07be3176ea2fe'; 

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error(error);
        var resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = 'Erro ao buscar dados. Por favor, tente novamente mais tarde.';
    });
});

function displayResults(data) {
    var resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data && data.data && data.data.length > 0) {
        data.data.forEach(item => {
            var resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Artista:</strong> ${item.artist}</p>
                <p><strong>Álbum:</strong> ${item.album}</p>
                <p><strong>Ano:</strong> ${item.album_year}</p>
                <p><strong>Letra:</strong> ${item.lyrics}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
    }
}
