const express = require('express');
const app = express();
// const records = require('./records');
const routes = require('./routes')



//middleware will run each time a request comes in unless you specified.
//express will call middleware functions in the order they've been added.
//Middleware needs to do one of two things
// - End the request-response cycle or tell express to move on to the next middleware function
//All express middleware take a third parameter - next()


// middleware which parses incoming JSON and make data available on the request body.
app.use(express.json());

//will only use if the requested route starts with a certain path (/api)
//if the path start with /api use the routes within the routes.js
app.use('/api',routes)

//Send a GET request to /quotes to READ a list of quotes
// app.get('/quotes', async (req,res,next) => {
//     try {
//         const quote = await records.getQuotes();
//         res.json(quote);
//     } catch (error) {
//         // res.json({message:error.message});
//         next(error);
//     }
// });

// app.get('/quotes', asyncHandler( async (req,res,next) => {
//     const quote = await records.getQuotes();
//     res.json(quote);
// }));


//Send a GET request to /quotes:id READ(view) a quote
// app.get('/quotes/:id',async (req,res,next) => {
//     try {
//         const id = Number(req.params.id)
//         const quote = await records.getQuote(id);
//         if(quote){
//             res.json(quote);
//         }else{
//             // res.status(404).json({message:'Quote was not found'});
//             const error = {
//                 status:404,
//                 message: "Quote was not found"
//             }
//             next(error);
//         }
//     } catch (error) {
//         // res.status(500).json({message:error.message});
//         next(error);
//     }
// })

// app.get('/quotes/:id',asyncHandler(async (req,res,next) => {
//     const id = Number(req.params.id)
//     const quote = await records.getQuote(id);
//     if(quote){
//         res.json(quote);
//     }else{
//         // res.status(404).json({message:'Quote was not found'});
//         const error = {
//             status:404,
//             message: "Quote was not found"
//         }
//         next(error);
//     }
// }));

//Send a GET request to /quotes/quote/random READ (view) a random quote
// app.get('/quotes/quote/random', async(req,res,next) => {
//     try {
//         const quote = await records.getRandomQuote();
//         if(quote){
//             res.json(quote);
//         }else{
//             // res.status(500).json({message:'Please try again.'})
//             const error = {
//                 message:'Please try again.'
//             }
//             next(error);
//         }
//     } catch (error) {
//         // res.status(500).json({message:error.message});
//         next(error);
//     }
// })

// app.get('/quotes/quote/random',asyncHandler(async (req,res,next) => {
//     const quote = await records.getRandomQuote();
//     if(quote){
//         res.json(quote);
//     }else{
//         // res.status(500).json({message:'Please try again'});
//         const error = {
//             message:'Please try again'
//         };
//         next(error);
//     }
// }));


//Send a POST request to CREATE a new quote
// app.post('/quotes',async (req,res,next) => {
//     try {
//         const quote = req.body.quote;
//         const author = req.body.author;
//         if(quote && author){
//             const newQuote = await records.createQuote({
//                 quote:quote,
//                 author:author
//             });
//             res.status(201).json(newQuote);
//         }else{
//             // res.status(404).json({message:"Quote and author is required."});
//             const error = {
//                 status:404,
//                 message:"Quote and author is required."
//             }
//             next(error);
//         }
//     } catch (error) {
//         // res.status(500).json({message:error.message});
//         next(error);
//     }
// });

// app.post('/quotes',asyncHandler(async (req,res,next) => {
//     const quote = req.body.quote;
//     const author = req.body.author;
//     if(quote && author){
//         const newQuote = await records.createQuote({
//             quote:quote,
//             author:author
//         });
//         res.status(201).json(newQuote);
//     }else{
//         // res.status(404).json({message:"Quote and author is required."});
//         const error = {
//             status:404,
//             message:"Quote and author is required."
//         }
//         next(error);
//     }
// }));


//Send a PUT request to UPDATE (edit) a quote
// app.put('/quotes/:id',async (req,res,next) => {
//     try {
//             const quote = await records.getQuote(Number(req.params.id));
//             if(quote){
//                 quote.quote = req.body.quote;
//                 quote.author = req.body.author;
//                 // quote.year = req.body.year;
//                 await records.updateQuote(quote);
//                 //Put request does not response with anything.
//                 //End() tell express to end the connection.
//                 res.status(204).end();
//             }else{
//                 res.status(404).json({message:'Quote Not Found.'})
//             }
//     } catch (error) {
//         res.status(500).json({message:error.message})
//         next(error)
//     }
// });

// app.put('/quotes/:id',asyncHandler(async (req,res,next) => {
//     const quote = await records.getQuote(Number(req.params.id));
//     if(quote){
//         quote.quote = req.body.quote;
//         quote.author = req.body.author;
//         // quote.year = req.body.year;
//         await records.updateQuote(quote);
//         //Put request does not response with anything.
//         //End() tell express to end the connection.
//         res.status(204).end();
//     }else{
//         res.status(404).json({message:'Quote Not Found.'})
//     }
// }));

//Send a DELETE request to DELETE a quote
// app.delete('/quotes/:id',async (req,res,next) => {
//     try {
//         const quote = await records.getQuote(Number(req.params.id));
//         if(quote){
//             await records.deleteQuote(quote);
//             res.status(204).end();
//         }else{
//             // res.status(404).json({message:'Quote Not Found'});
//             const error = {
//                 status:404,
//                 message:"Quote Not Found"
//             }
//             next(error);
//         }
//     } catch (error) {
//         // res.status(500).json({message:error.message});
//         next(error);
//     }
// });

// app.delete('/quotes/:id',asyncHandler(async (req,res,next) => {
//     const quote = await records.getQuote(Number(req.params.id));
//     if(quote){
//         await records.deleteQuote(quote);
//         res.status(204).end();
//     }else{
//         // res.status(404).json({message:'Quote Not Found'});

//         const error = {
//             status:404,
//             message:"Quote Not Found"
//         }
//         next(error);
//     }
// }));

//will run if no routes is found
app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    
    //informs express that there's an error
    //pass the error to the error handler
    next(error);
});

//error handler
//has four parameters
//express will pass the error into the error {object} parameter 
app.use((error,req,res,next) => {
    //if status will be 500 if the error.status is undefined
    res.status(error.status || 500);
    res.json({
        message:error.message
    })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
