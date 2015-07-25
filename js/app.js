



var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

Parse.initialize("1dlfQyT8N0OrUJXzRWk9gtWz3fXHYNgKnZNOhWyY", "OTs8JFyPYJ3yrm03qc1jgY9NGCFJBXqsxsNCKT8E");
var DB = "Test";

$(".next").click(function(){

    if(animating) return false;
    
        $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore"
        }); 
    
//     $("#msform").validate({
//   rules: {
   
//       required: true,
//       email: true
//   }
// });

// GET VALUES FROM ARRAY OF INPUTS
        var values = $(this).parent().serializeArray();
        console.log(values);

        //add parse
        var User = Parse.Object.extend(DB);
        var trial = new User();

        // for all the values in form
        for (var prop in values) {
          var name = values[prop].name;
          console.log(name);
          var value = values[prop].value;
          console.log(value);

            // add to PARSE
            trial.set(name, value);

                 trial.save(null, {
              success: function(trial) {
                console.log("success");
              },
              error: function(trial, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
              }
            });


        }

       


    if($("#msform").valid()){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        animating = true;


         // this is the VALUES OF THE INPUTS   
        var values = $(this).parent().serializeArray();
        console.log(values);





            
            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            
            //show the next fieldset
            next_fs.show(); 
            //hide the current fieldset with style
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    left = (now * 50)+"%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({'transform': 'scale('+scale+')'});
                    next_fs.css({'left': left, 'opacity': opacity});
                }, 
                duration: 800, 
                complete: function(){
                    current_fs.hide();
                    animating = false;
                }, 
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
    }
    
    
   
});

$(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function(){
    return false;
})

















// var form = $("#bstform").show();
 
// form.steps({
//     headerTag: "h3",
//     bodyTag: "fieldset",
//     transitionEffect: "slideLeft",

//     onStepChanging: function (event, currentIndex, newIndex)
//     {




//         // Allways allow previous action even if the current form is not valid!
//         if (currentIndex > newIndex)
//         {
//             return true;
//         }
//         // Forbid next action on "Warning" step if the user is to young
//         if (newIndex === 3 && Number($("#age-2").val()) < 18)
//         {
//             return false;
//         }
//         // Needed in some cases if the user went back (clean up)
//         if (currentIndex < newIndex)
//         {
//             // To remove error styles
//             form.find(".body:eq(" + newIndex + ") label.error").remove();
//             form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
//         }
//         form.validate().settings.ignore = ":disabled,:hidden";


//         return form.valid();
//     },
//     onStepChanged: function (event, currentIndex, priorIndex)
//     {
//         // Used to skip the "Warning" step if the user is old enough.
//         if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
//         {
//             form.steps("next");
//         }
//         // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
//         if (currentIndex === 2 && priorIndex === 3)
//         {
//             form.steps("previous");
//         }
//     },
//     onFinishing: function (event, currentIndex)
//     {
//         form.validate().settings.ignore = ":disabled";
//         return form.valid();
//     },
//     onFinished: function (event, currentIndex)
//     {
//         alert("Submitted!");
//     }


// })
// .validate({
//     errorPlacement: function errorPlacement(error, element) { element.before(error); },
//     rules: {
//         confirm: {
//             equalTo: "#password"
//         }
//     }
// });

