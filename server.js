console.log("GILOG ON FIRE..");

var
  dotenv = require('dotenv').load({silent: true}),
  express = require('express'),
  app = express(),
  cors = require('cors')
  router = express.Router();
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require('path'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  config = require('./webpack.config.js'),
  port = process.env.PORT || 7000;

var  seeds = require('./seeds.js')

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
app.use(cors())
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


  router.get('/seed',
    function seed(req, res) {
      Blog.remove({}, function(err) {
        if(err) return console.log(err)
        Blog.insertMany(seeds, function(err, blogs) {
          if(err) return console.log(err)
          res.json({success: true, message: "Blogs created!", blogs: blogs})
        })
      })
  })


app.get('*', function(req, res) {
  res.sendFile('/index.html', {root: './'})
})

app.listen(port, function(err) {
  console.log(err || "Server running on port " + port)
})
