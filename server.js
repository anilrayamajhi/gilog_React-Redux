var
  express = require('express'),
  app = express(),
  router = express.Router();
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  path = require('path'),
  PORT = process.env.port || 3000

  var
    mongoose = require('mongoose'),
    blogSchema = new mongoose.Schema({
      title: String,
      categories: String,
      content: String
    }, {timestamps: true})

  var Blog = mongoose.model('Blog', blogSchema)

mongoose.connect('mongodb://localhost/GILOG', function(err) {
  console.log(err || "Connected to MongoDB (GILOG)")
})



app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static('/index.html'))

app.use('/api', router);

router.route('/posts')
  .get(
    function index(req, res) {
      Blog.find({}, function(err, blogs) {
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
          res.sendFile('/client/index.html', {root: './'})
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
