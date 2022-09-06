window.onload = () => {

    fetch('http://localhost:3031/api/movies/1')
    .then(response => response.json())
    .then(pelicula => {
        console.log(pelicula);
        document.getElementById('title').value = pelicula.data.title;
        document.getElementById('rating').value = pelicula.data.rating;
        document.getElementById('awards').value = pelicula.data.awards;
        let fecha = pelicula.data.release_date.slice(0, 10);
        document.getElementById('release_date').value = fecha;
        document.getElementById('length').value = pelicula.data.length;

        //Update movie data in the database using the PUT method and the fetch API 

        document.getElementById('editar').addEventListener('click', (e) => {
            e.preventDefault();
            
            const dataHTML = new FormData(document.getElementById('form'));

            const data = {
                title: dataHTML.get('title'),
                rating: dataHTML.get('rating'),
                awards: dataHTML.get('awards'),
                release_date: dataHTML.get('release_date'),
                length: dataHTML.get('length')
            }
        
            fetch(`http://localhost:3031/api/movies/update/${pelicula.data.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
        })

        document.getElementById('crear').addEventListener('click', (e) => {
            e.preventDefault();
            
            const dataHTML = new FormData(document.getElementById('form'));

            const data = {
                title: dataHTML.get('title'),
                rating: dataHTML.get('rating'),
                awards: dataHTML.get('awards'),
                release_date: dataHTML.get('release_date'),
                length: dataHTML.get('length')
            }
        
            fetch(`http://localhost:3031/api/movies/create`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
        })
    })
    .catch(error => console.log(error))
}