var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.pluralize(null);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://anjumzaki:anjumzaki123@ds263436.mlab.com:63436/practiceapp');
var db = mongoose.connection;
db.once('open', function () { });
var key = 123;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.headers.key == "123") {
        next();
    }
    else {
        res.status(404).send({
            success: 'false',
            message: 'key is not correct',
        })
    }
});
var articleSchema = new mongoose.Schema({
    articleNumber: Number,
    articleName: String,
    number: Number,
    articlePrice: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { versionKey: false }, { _id: false, id: false });

var Article = mongoose.model('ArticleData', articleSchema);

app.post('/api/add', async (req, res) => {
    const article = new Article({
        articleNumber: req.body.articleNumber,
        articleName: req.body.articleName,
        number: req.body.data,
        articlePrice: req.body.articlePrice,
    });
    article.save(function (err) {
        if (err) return console.error(err);
    });
    res.status(200).send({
        success: 'true',
        message: req.headers.key,
        article,

    })
});
app.get("/api/edit/:articleId", async (req, res) => {
    Article.findByIdAndUpdate(req.params.articleId, {
        $set: { articleNumber: req.body.articleNumber, articleName: req.body.articleName, number: req.body.number, articlePrice: req.body.articlePrice }
    }, { upsert: true }, function (err, user) {
        res.status(200).send({
            success: 'true',
            message: 'article Created',
            user,
        })
    });
});



app.get("/api/get", async (req, res) => {

    var result = await Article.find().exec();
    res.status(200).send({
        success: 'true',
        message: req.headers.key,
        result,
    })

    res.status(401).send({
        success: 'false',
        message: req.headers.key,
        result,
    })
});



const PORT = 2000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});