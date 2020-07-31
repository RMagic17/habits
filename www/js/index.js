var $$ = Dom7;


//MuestraMensaje();

var app = {
    /* Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};



function showSplashScreen(){

  setTimeout(function(){  InitApp();   }, 2000);

}


function InitApp(){

   if(localStorage.getItem("habits-login")=="autenticado"){
       mainView.router.navigate('/login/',{animate:true});   
   }else{
    mainView.router.navigate('/frase/',{animate:true});
   }

}




function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  alert('Connection type: ' + states[networkState]);
}




var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'habits',
    // App id
    id: 'com.habits.app',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [{
      path: '/tutorial/',
      url: 'views/tutorial.html',
      },
      {
        path: '/home/',
        url: 'views/home.html',
      },
      {
        path: '/login/',
        url: 'views/login.html',
      },
      {
        path: '/registro/',
        url: 'views/registro.html',
      },
      {
        path: '/perfil/',
        url: 'views/perfil.html',
      },
      {
        path: '/loginface/',
        url: 'views/loginface.html',
      },
      {
        path: '/frase/',
        url: 'views/frase.html',
      },

    ],
    // ... other parameters
  });


  var mainView = app7.views.create('.view-main');


  // Show preloader before Ajax request
   //app7.preloader.show('blue');


   // Create full-layout notification
var notificationFull = app7.notification.create({
    icon: '<i class="f7-icons">alarm</i>',
    title: 'Framework7',
    titleRightText: 'now',
    subtitle: 'This is a subtitle',
    text: 'This is a simple notification message',

  });



  function Ingresar(){

    var usuario = $$('#usuario').val();
    var password = $$('#password').val();

    app7.preloader.show('blue');

    app7.request({
      url: 'http://localhost/habits/api/login.php',
      data:{username:usuario,password:password},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        if(objson.data == "AUTENTICADO"){

          localStorage.setItem("habits-login", "autenticado");

        mainView.router.navigate('/home/',{animate:true});
        
        }else{
          console.log("respuesta appi:"+objson.data);
          alert("USUARIO Y/O PASSWORD INCORRECTO");
        }
      
      },
      error:function(error){

        app7.preloader.hide();
      
      }
      
      });

  }


  function Registrarse(){

      var nombre = $$('#nombre').val();
      var correo = $$('#correo').val();
      var usuario = $$('#usuarior').val();
      var password = $$('#passwordr').val();
  

      app7.preloader.show('blue');
  
      app7.request({
        url: 'http://localhost/habits/api/users.php',
        data:{name:nombre,correo:correo,username:usuario,password:password},
        method:'POST',
        crossDomain: true,
        success:function(data){
             
          app7.preloader.hide();
  
          var objson = JSON.parse(data);
  
          if(objson.status_message == "CORRECTO"){
  
          alert("Muchas gracias por registarte ya puedes acceder");
          mainView.router.navigate('/login/',{animate:true});
          
          }else{
  
            alert("Hubo un error intentalo nuevamente");
          }
        
        },
        error:function(error){
  
          app7.preloader.hide();
        
        }
        
        });
  
  }


 

  function AbrirNotificacion(){
    

    notificationFull.open();
   

  }





  function MuestraMensaje(){
      alert("ehh funciona!!!");
      console.log("ehh funciona!!");
  }

  $$(document).on('page:init', '.page[data-name="login"]', function (e) {
     

    var calendarDefault = app7.calendar.create({
      inputEl: '#demo-calendar-default',
    });

  function Cerrarsesion(){

  localStorage.setItem("habits-login", "false");

  mainView.router.navigate('/login/',{animate:true});

  } ;