

function inputinterests(){

   $(document).on('click','#savechanges',function(e){
       e.preventDefault();
       let inputinterest = document.getElementById('interests').value;
       let profileemail=document.getElementById('profileemail').textContent;
       console.log(profileemail);
       console.log(inputinterest.split(','));
       updatedarray = inputinterest.split(',');
       $.ajax({
           type:'POST',
           url :'/home/updateint',
           data : inputinterest,
           success:function(){
               location.reload(true);
           }
       })
   })

}

function searchkeyword(){

    $(document).off('click').on('click','#keywordsearch',function(e){
        e.preventDefault();
        let inputkeyword = document.getElementById('myInput').value;

        $.ajax({
            type:'POST',
            url :'/home/keywordsearch',
            data : inputkeyword,
            success:function(response){
                console.log(response);
                
            },
            error: function(error){
                if(error.responseText == 'showAlert'){
                    alert("Please enter a Valid Keyword, Keyword not found!!");
                    event.stopImmediatePropagation();
                }
            }
        })
    })

 }

 function likebtn(x){

    x.classList.toggle("red");

    $(document).ready(function() {
        $('#heart').off('clcik').on('click',function(e) {
            if($(this).prop("checked") == true) {
              console.log("Checkbox is checked.");
              
            }
            else if($(this).prop("checked") == false) {
              console.log("Checkbox is unchecked.");
            }
           
              
          });
      });
 }

 $(document).ready(function () {
   $('#col3').change(function () {
     if (this.checked){
        if ($('.ll').text() == 'Technology'){
            $('#int_length').fadeOut('slow');
        }else{
            $('#int_length').fadeIn('slow');
        }
    }
   });
 });

$(document).on('click', '#conatiner li input', function(){
    checkbox_id = $(this).attr('value');
    ch = this.checked;
        if(this.checked == false){
            if ($('.ll').text() == 'Technology'){
                $("[data-value*="+checkbox_id+"").hide();
        } 
        }else {
            if(this.checked == true ){
                $("[data-value*="+checkbox_id+"").show();
            }
        }
});

// $('#heart').off('click').on('click', function(){
//     var divid = $("div > a").attr('href');
//     console.log(divid);
// });
<<<<<<< HEAD

function likeBttn(x){
        heart_btn = $(x).attr('id');
        console.log(heart_btn);
        $.ajax({
            type: 'POST',
            url: '/home/likeButton',
            data: {link: heart_btn},
          success:function(){
          console.log("successfully added to likes");
          }
        });
}

=======
 $(document).off('click').on('click','div.card div.card-body input', function(){
     heart_btn = $(this).attr('id');
     $.ajax({
         type: 'POST',
         url: '/home/likeButton',
         data: {link: heart_btn},
       success:function(){
       console.log("successfully added to likes");
       }
     })
});
>>>>>>> 0c21abde1a3ffa807bcdbbef1bb97c6e093550a6
