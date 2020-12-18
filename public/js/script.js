

function inputinterests(){

   $(document).on('click','#savechanges',function(e){
       e.preventDefault();
       let inputinterest = document.getElementById('interests').value;
       let profileemail=document.getElementById('profileemail').textContent;
    //    console.log(profileemail);
    //    console.log(inputinterest.split(','));
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
                // console.log(response);
                
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

    // $(document).off('click').on('click','.like', function(){
    //     heart_btn = $(this).attr('id');
    //     console.log(heart_btn);
    //     $.ajax({
    //         type: 'POST',
    //         url: '/home/likeButton',
    //         data: {link: heart_btn},
    //       success:function(response){
    //         console.log(response)
    //       console.log("successfully added to likes");
    //       }
    //     })
    // });
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
                $("[data-value*="+checkbox_id+"").hide();
        } 
        else {
            if(this.checked == true ){
                $("[data-value*="+checkbox_id+"").show();
            }
        }
});

// $('#heart').off('click').on('click', function(){
//     var divid = $("div > a").attr('href');
//     console.log(divid);
// });

function likeBttn(x){
        heart_btn = $(x).attr('id');
        check = x.checked;
        // console.log(heart_btn, check);
        $.ajax({
            type: 'POST',
            url: '/home/likeButton',
            data: {link: heart_btn, check:check},
          success:function(){
        //   console.log("successfully added to likes");
          }
        });
}
