
let meme = require('./db.json');
let globalID = 11;

module.exports = {
    getMeme: (req, res) => {
        res.status(200).send(meme)
    },
    deleteMeme: (req, res) => {
        let index = meme.findIndex(elem => elem.id === +req.params.id);
        meme.splice(index, 1);
        res.status(200).send(meme);
    },
    createMeme: (req, res) => {
        const {title, rating, imageURL} = req.body;
        let newMeme = {
            id: globalID,
            title,
            rating,
            imageURL
        }
        meme.push(newMeme);
        globalID++;
        res.status(200).send(meme);
    },
    updateMeme: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = meme.findIndex(elem => +elem.id === +id);
        console.log(type);
        if(type === 'minus' && meme[index].rating > 0){
            meme[index].rating -= 1;
            res.status(200).send(meme);
        } else if(type === 'plus' && meme[index].rating < 5){
            meme[index].rating += 1;
            res.status(200).send(meme);
        } else {
            res.status(400).send('Something went wrong...')
        }
    }
}