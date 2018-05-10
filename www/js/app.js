// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },

    request: function(url,data,callback){
        var xmlhttp;
        if (window.XMLHttpRequest)
          {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
          }
         else
          {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
           } 
           xmlhttp.onreadystatechange=function()
       {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   var response= xmlhttp.responseText;
   callback.handle(response);
    }
  }
     xmlhttp.open("POST","http://gstdev.tagq.org/api/v1/"+url,true);
     xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     xmlhttp.send();
    },
    sgin: function(phone,password){
      var data="phone="+phone+"&password="+password+"&sign_type=sign_in";
      this.request("users/sign",data,function(response){
         app.dialog.alert('response: ' + response);
      });

    }
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var phone = $$('#my-login-screen [name="phone"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  // Close login screen
  // app.loginScreen.close('#my-login-screen');
  
  
  // Alert username and password
  app.dialog.alert('phone: ' + phone + '<br>Password: ' + password);
  app.methods.sgin(phone,password);
});
