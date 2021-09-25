import CatInfo from "../models/Cat.js";
import fetch from 'node-fetch';

const getBreeds = (breed) => {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.name_id}`, {
            method: 'GET',
            headers: {
                "X-Api-Key": process.env.CAT_API_KEY
            }
        })
        .then(response => { return response.json() })
        .catch(err => console.log(err))
}

const getMissingBreeds = (amount) => {
    return fetch(`https://api.thecatapi.com/v1/breeds?limit=${amount}`, {
        method: 'GET',
        headers: {
            "X-Api-Key": process.env.CAT_API_KEY
            }
        })
        .then(response => { return response.json() })
        .catch(err => console.log(err))
}

export const mostVisited = async (req, res) => {
    const breedAmount = req.query.amount;
    const topBreeds = [];
    try {
        const breedRanking = await CatInfo.find().sort({'visitCount': 'desc'});
        while(topBreeds.length < breedRanking.length && topBreeds.length < breedAmount){
            const breed = await getBreeds(breedRanking[topBreeds.length]);
            topBreeds.push(breed[0]);
        }
        if(topBreeds.length < breedAmount){
            const missingBreeds = await getMissingBreeds(breedAmount-topBreeds.length, topBreeds)
            topBreeds.push(...missingBreeds);
        }
        res.status(200).json(topBreeds);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const visitBreed =  async (req, res) => {
    const id = req.body.id;
    try {
        const visitedBreed = await CatInfo.findOne({"name_id": id})
        if(visitedBreed){
            visitedBreed.visited();
            await visitedBreed.save()
            res.status(200).json({ greetings: `${visitedBreed.name_id} says hi!`})
        } else {
            const firstVisited = new CatInfo({'name_id': id})
            firstVisited.visited();
            await firstVisited.save();
            res.status(200).json({ greetings: `${firstVisited.name_id} thanks you for being the first one to visit`})
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}