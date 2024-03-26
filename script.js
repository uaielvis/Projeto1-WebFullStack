document.getElementById("bibleForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const livro = document.getElementById("livro").value;
    const capitulo = document.getElementById("capitulo").value;
    const versiculo = document.getElementById("versiculo").value;
    const traducao = document.getElementById("traducao").value;

    fetch(`https://bible-api.com/${livro}+${capitulo}:${versiculo}?translation=${traducao}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha ao buscar o versículo");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("verseContainer").innerHTML = `<p><strong>${livro} ${capitulo}:${versiculo}</strong> - ${data.text}</p>`;
        })
        .catch(error => {
            console.error("Erro ao buscar o versículo:", error);
            document.getElementById("verseContainer").innerHTML = "<p>Erro ao buscar o versículo. Por favor, tente novamente.</p>";
        });
});
