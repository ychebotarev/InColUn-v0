$(document).ready(function ($) {
  $('form-login').submit(function() {
      $.ajax({
         type:'POST',
         url:'/login',
         data:  {
               email: $('#login-email').val(), 
               password: $('#login-password').val()},
         success:function(result){
            if(!result){
               $('form input[name="password"]').css("background-color", "red");
            }
         },
         error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
         }
      });


      return false;
   });
});
      