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

export const getBreedInfo = async (req, res) => {
    const breedID = req.query.id;

    await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}&limit=100`, {
        method: 'GET',
        headers: {
            "X-Api-Key": process.env.CAT_API_KEY,
        }
    })
        .then(response => { return response.json() })
        .then(resp => {
            const images = {}
            resp.forEach(entry => {
                images[entry.id] = entry.url
            })
            const breedData = {
                images: images,
                data: resp[0].breeds[0]
            }
            return breedData;
        })
        .then(breedData => res.status(200).json(breedData))
        .catch(err => { res.status(400).json({ message: err.message })})
}