//Router allow for the mapping of each routes to an endpoints that start with a path ex: (/api)
//  -eliminate the need to repeat a path on every route
//  -keep express files more modular


const express = require('express');
const records = require('./records');
//allow for routes to be route to /api without having to specify it on every single route
const router = express.Router();


//handle try/catch
function asyncHandler(cb){
    return async (req,res,next)=> {
        try {
            await cb(req,res,next);
        } catch (error) {
            next(error)
        }
    }
}
//Send a GET request to /quotes to READ a list of quotes
router.get('/quotes', asyncHandler( async (req,res,next) => {
    const quote = await records.getQuotes();
    res.json(quote);
}));

//Send a GET request to /quotes:id READ(view) a quote
router.get('/quotes/:id',asyncHandler(async (req,res,next) => {
    const id = Number(req.params.id)
    const quote = await records.getQuote(id);
    if(quote){
        res.json(quote);
    }else{
        // res.status(404).json({message:'Quote was not found'});
        const error = {
            status:404,
            message: "Quote was not found"
        }
        next(error);
    }
}));
//Send a GET request to /quotes/quote/random READ (view) a random quote
router.get('/quotes/quote/random',asyncHandler(async (req,res,next) => {
    const quote = await records.getRandomQuote();
    if(quote){
        res.json(quote);
    }else{
        // res.status(500).json({message:'Please try again'});
        const error = {
            message:'Please try again'
        };
        next(error);
    }
}));
//Send a POST request to CREATE a new quote
router.post('/quotes',asyncHandler(async (req,res,next) => {
    const quote = req.body.quote;
    const author = req.body.author;
    if(quote && author){
        const newQuote = await records.createQuote({
            quote:quote,
            author:author
        });
        res.status(201).json(newQuote);
    }else{
        // res.status(404).json({message:"Quote and author is required."});
        const error = {
            status:404,
            message:"Quote and author is required."
        }
        next(error);
    }
}));
//Send a PUT request to UPDATE (edit) a quote
router.put('/quotes/:id',asyncHandler(async (req,res,next) => {
    const quote = await records.getQuote(Number(req.params.id));
    if(quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        // quote.year = req.body.year;
        await records.updateQuote(quote);
        //Put request does not response with anything.
        //End() tell express to end the connection.
        res.status(204).end();
    }else{
        res.status(404).json({message:'Quote Not Found.'})
    }
}));

//Send a DELETE request to DELETE a quote
router.delete('/quotes/:id',asyncHandler(async (req,res,next) => {
    const quote = await records.getQuote(Number(req.params.id));
    if(quote){
        await records.deleteQuote(quote);
        res.status(204).end();
    }else{
        // res.status(404).json({message:'Quote Not Found'});

        const error = {
            status:404,
            message:"Quote Not Found"
        }
        next(error);
    }
}));


module.exports = router;