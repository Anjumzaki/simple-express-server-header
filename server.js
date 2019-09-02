var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.pluralize(null);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://anjumzaki:anjuzmaki123@ds351987.mlab.com:51987/articledata', { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', function () { });
var key = 123;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
var articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    data: String,
    genre: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { versionKey: false }, { _id: false, id: false });

var Article = mongoose.model('ArticleData', articleSchema);

app.post('/api/add', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        data: req.body.data,
        genre: req.body.genre,

    });
    article.save(function (err) {
            if (err) return console.error(err);
        });
        res.status(200).send({
            success: 'true',
            message: 'article Created',
            article,
        })
    }); const PORT = 2000;

app.get("/api/get", async (req, res) => {
    var result = await Article.find().exec();
    res.status(200).send({
        success: 'true',
        message: 'article Created',
        result,
    })
});

app.get("/api/edit/:articleId", async(req,res) =>{
    Article.findByIdAndUpdate(req.params.articleId, { 
        $set: { title: req.body.title, author: req.body.author, data: req.body.data, author: req.body.genre }}, {upsert:true}, function (err, user) {
            res.status(200).send({
                success: 'true',
                message: 'article Created',
                user,
            })
    });
    });
    app.post("/api/edit/:articleId", async(req,res) =>{
        Article.findByIdAndUpdate(req.params.articleId, { 
            $set: { title: req.body.title, author: req.body.author, data: req.body.data, author: req.body.genre }}, {upsert:true}, function (err, user) {
                res.status(200).send({
                    success: 'true',
                    message: 'article Created',
                    user,
                })
        });
        });



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});