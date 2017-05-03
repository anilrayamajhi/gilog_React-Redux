var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  router = express.Router();
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require('path'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  config = require('./webpack.config.js'),
  PORT = process.env.port || 3000;

var compiler = webpack(config);

  var
    mongoose = require('mongoose'),
    blogSchema = new mongoose.Schema({
      title: {type: String, trim: true},
      categories: String,
      content: String
    }, {timestamps: true})

  var Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(process.env.MONGO_URL, function(err) {
  console.log(err || "Connected to MongoDB (GILOG)")
})



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'/index.html')))
app.use('/swal', express.static(__dirname + '/node_modules/sweetalert/dist/'));
app.use(webpackMiddleware(compiler));


app.use('/api', router);

router.route('/posts')
  .get(
    function index(req, res) {
      Blog.find().sort([['updatedAt', 'descending']]).exec(function(err, blogs) {
        if(err) return console.log(err)
        res.json(blogs)
      })
    }
  )
  .post(
    function create(req, res) {
      Blog.create(req.body, function(err, blog) {
        if(err) return console.log(err)
        res.json({success: true, message: "Blog created! 👻👻👻👻", blog: blog})
      })
    }
  )

router.route('/posts/:id')
  .get(
    function show(req, res, next) {
      Blog.findById(req.params.id, function(err, blog) {
          if(err) {
          console.log('ERROR: ', err);
          res.sendFile('/index.html', {root: './'})
        }
      res.json(blog)
    })
  })
//   .patch(blogCtrl.update)
  .delete(
    function destroy(req, res) {
      Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) return console.log(err)
        res.json({success: true, message: "Blog deleted 😪"})
      })
    }
  )


app.get('*', function(req, res) {
  res.sendFile('/index.html', {root: './'})
})

app.listen(PORT, function(err) {
  console.log(err || "Server running on port " + PORT)
})
