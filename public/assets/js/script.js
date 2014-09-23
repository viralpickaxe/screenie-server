$(document).ready(function(){
  $('.js-createscreenshot').find('.js-url').focus();
})

$('.js-createscreenshot').on('submit',function(){
  var $form = $(this);
  var $url = $form.find('.js-url');
  var $btn = $form.find('.js-btn');
  var oldbtn = $btn.html();
  
  $url.prop('disabled',true);
  $btn.html('Queuing').prop('disabled',true);

  $.ajax({
    type: "POST",
    data: JSON.stringify({url:$url.val()}),
    contentType: 'application/json',
    url: "/screenshot/",
    success: function(response){
      if(response.success){
        $url.val('').prop('disabled',false);
        $btn.html(oldbtn).prop('disabled',false);
        $form.find('.viewlink').prop('href',response.imgurl).show();;
      } else {
        $url.prop('disabled',false);
        $btn.html(oldbtn).prop('disabled',false);
        notification_show(response.msg,'error',5000);
      }
    }
  });

  return false;
});

function notification_show(notification,type,time){
  if($('.notification').length==0){
    $('body').prepend($('<div class="notification"></div>'));
  } else {
    clearTimeout(NotificationTimeout);
  }
  var $notif = $('.notification');
  var time = time || 3000;

  $notif.html(notification);
  $notif.removeClass('success error').addClass(type).fadeIn();
  window.NotificationTimeout = setTimeout(function(){
    notification_hide();
  },time);
}

function notification_hide(){
  var $notif = $('.notification');

  $notif.fadeOut(function(){
    $notif.remove();
  });
}