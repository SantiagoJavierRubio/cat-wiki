import fetch from 'node-fetch';

export const getBreedList = (req, res) => {
    fetch("https://api.thecatapi.com/v1/breeds", {
        method: 'GET',
        headers: {
            "X-Api-Key": process.env.CAT_API_KEY
        }
    })
        .then(response => { return response.json()})
        .then(resp => {
            const breedList = []
            resp.forEach(breed => {
                breedList.push({
                    id: breed.id,
                    name: breed.name
                })
            })
            res.status(200).json(breedList);
        })
        .catch(err => { res.status(400).json({ message: err.message }) })
}

export const getBreedInfo = (req, res) => {
    const breedName = req.query.name;
    console.log(breedName);
    fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, {
        method: 'GET',
        headers: {
            "X-Api-Key": process.env.CAT_API_KEY
        }
    })
        .then(response => { return response.json() })
        .then(resp => { res.status(200).json(resp)} )
        .catch(err => { res.status(400).json({ message: err.message }) })
}