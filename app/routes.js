// app/routes.js
module.exports = function(app, passport, SportPost, User) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      SportPost.find({},function(err,posts) {
        var postsMap = {};
        posts.forEach(function(post) {
          postsMap[post._id] = post;
        });
        if (req.isAuthenticated()) {
          var firstName = req.user.local.first_name;
          var lastName = req.user.local.last_name;
          res.render('main_logged.ejs', {first_name: firstName, last_name: lastName,sports_data:postsMap});
        }
        else {
          res.render('index.ejs',{sports_data:postsMap}); // load the index.ejs file
        }
      })
    });

    app.get('/ajaxcall', function(req,res) {
      var id = req.query.id

      SportPost.find({},function(err,posts) {
        var postsMap = {};
        posts.forEach(function(post) {
          if ( post._id == id) {
            res.json({status: "Success", data: post});
          }
        });
      })
    });

    app.get('/post/:postID', function(req,res) {
      var requestID = req.params.postID;
      var firstName = req.user.local.first_name;
      var lastName = req.user.local.last_name;
      console.log("worked");

      res.render('sportspost.ejs');

    })

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post("/submitpost", function(req,res) {
      SportPost.create({
           id: "lol",
           category: "lol",
           header: req.body.postname,
           shortdescription: req.body.postdes,
           longdescription: "lol"
         }, function (err, small) {
           if (err) return handleError(err);
           res.redirect("/");
      });
    })

    app.post("/cancelpost", function(req,res) {
      res.redirect("/");
    })

    app.post('/newpost', function(req,res) {
      var firstName = req.user.local.first_name;
      var lastName = req.user.local.last_name;


      res.render('newpost.ejs', {first_name: firstName, last_name: lastName})
    })

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
