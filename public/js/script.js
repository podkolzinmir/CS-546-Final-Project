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

    $(document).on('click','#keywordsearch',function(e){
        e.preventDefault();
        let inputkeyword = document.getElementById('myInput').value;
        
        $.ajax({
            type:'POST',
            url :'/home/keywordsearch',
            data : inputkeyword,
            success:function(){
                location.reload(true);
            }
        })
    })
 
 }
