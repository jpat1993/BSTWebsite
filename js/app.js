



var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var inputs;
var obj = {id: "unchanged", submitted: false, first: true, current: "#login"};

var fieldsets = ["#login", "#existingfs1", "#startfs1", "#parentfs1", "#sanchalakfs1", "#academicfs1", "#satsangfs1", "#essayfs1", "#niyamfs1", "#finish1"]

Parse.initialize("1dlfQyT8N0OrUJXzRWk9gtWz3fXHYNgKnZNOhWyY", "OTs8JFyPYJ3yrm03qc1jgY9NGCFJBXqsxsNCKT8E");
var DB = "Test";

function headerClick(id){   

    console.log(("#"+ id+"1"));
    console.log($("#"+ id+"1").index());

    // current_fs = $(this).prev();
    // var test= $(this).next();
    // var test2= $(this).siblings();
    // var test3= $(this).parent().parent().children();
    // console.log(test);
    // console.log(test2);
    // console.log(test3);


        console.log(current_fs);
        console.log(current_fs.index());
        console.log($("fieldset").index(current_fs));

    console.log($("fieldset").index(current_fs));
    console.log(current_fs);
    console.log($(obj.current));

    current_fs = obj.current;
    next_fs = $("#"+ id+"1");

    // $("#progressbar li").eq($("fieldset").index(current_fs).addClass("active"));

    $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore, :hidden"
        }); 

    console.log($("#msform").valid());
        // GET VALUES FROM ARRAY OF INPUTS
        var test = current_fs.serializeArray();
        console.log(test);

        var check = checkifValid(test);

    if(check) {
        shiftPage(current_fs, next_fs);
        if(obj.submitted) {
            getInfo(obj.id,next_fs);
        }
    } else {
        alert("Please Fill out all the Required Information");
    }

};



$(".new").click(function(){

    // console.log($(this).parent());
    // console.log($("#start"));


    animating = true;

    current_fs = $(this).parent();
    console.log(obj.current);
 


    next_fs = $("#startfs1");
    next_fs.show(); 
    obj.current = next_fs;
        console.log(obj.current);


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

});



$(".existing").click(function(){

    // console.log($(this).parent());
    // console.log($("#start"));


    animating = true;

    current_fs = $(this).parent();
    

    next_fs = $("#existingfs1");
    next_fs.show(); 
    obj.current = next_fs;
        console.log(obj.current);
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

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

});

$(".search").click(function(){
    

    var input = $(this).parent().serializeArray();
    var email = input[0].value;
    console.log(email);

    // var div = document.createElement("P");
    // div.style.width = "50vw";
    // div.style.height = "60vh";
    // div.style.background = "red";
    // div.style.margin = "50px auto";

    // document.body.appendChild(div);

    var div = document.getElementById("searchResults");

    var searcher = Parse.Object.extend(DB);
    var query = new Parse.Query(searcher);
    query.startsWith("email", email);
    event.preventDefault();
    query.find({
        success: function(results) {
        // alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              // alert(object.id + ' - ' + object.get('email') + "name" : object.get('name'));

              // div.appendChild(document.
                var t = document.createTextNode(object.id + ' - ' + object.get('email') + "\n name :" + object.get('name') + "\n");

              var btn = document.createElement("button");

              btn.setAttribute("id", object.id);
              btn.setAttribute('onclick','check(id);');
                btn.setAttribute('class', 'btn btn-default');
                btn.setAttribute("style","text-align: center", "margin = '50px auto'");
                
                btn.appendChild(t);

                div.appendChild(btn);
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });


});


function check(ObjectID) {

    obj.id = ObjectID;

    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);
    var pass = prompt("Please enter your Password");
    event.preventDefault();
    query.get(ObjectID, {
        success: function(details) {
                console.log(details)
            if(pass === details.get("password")) {
                console.log(ObjectID);
                obj.submitted = true;
                gotoStart();
                loadDetails(details.id);
                
            } else {
                alert("Your Password is Incorrect!")
            }
        },
        error: function(object, error) {
            alert("Error: " + error.code + " " + error.message);
        }
        
    });

    console.log(obj.id);
};


function gotoStart(){
    animating = true;

    current_fs =  $("#existingfs1");

    console.log(current_fs);
    next_fs = $("#startfs1");
    next_fs.show(); 
    obj.current = next_fs;
        console.log(obj.current);

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");


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

function loadDetails(ObjectID) {
   
    //add parse
    var tester = Parse.Object.extend(DB);
    var query = new Parse.Query(tester);

    var values = $("#msform").serializeArray();
    console.log(values);

    console.log(obj.id);

    event.preventDefault();

    query.get(ObjectID, {
        success: function(details) {
            for (var prop in values) {
                  var lookup = values[prop].name;
                  console.log(obj[lookup]);
                  console.log(obj);
                  console.log(details.get(lookup));
                  obj[lookup] = details.get(lookup);
                  console.log(obj[lookup]);
                  console.log(obj);

                  // $("#"+lookup).val(details.get(lookup));

                  // console.log(name);
                  // console.log(details.get(lookup));
                  // console.log("#"+lookup);
                  // console.log();

                  // var value = values[prop].value;
                  // console.log(value);
                  // console.log(ObjectID);
              };


            getInfo(obj.id,next_fs);

            
            // if(pass === details.get("password")) {
            //     loadDetails(details.get("id"));
            // } else {
            //     alert("Your Password is Incorrect!")
            // }
        },
        error: function(object, error) {
            alert("Error: " + error.code + " " + error.message);
        }
        
    });


// console.log($('input[name="name"]').val('jay'));
};

function getInfo(ObjectID,field) {


    var values = field.serializeArray();
    console.log(values);

    console.log(obj.id);

    for (var prop in values) {
          var lookup = values[prop].name;


          console.log(obj[lookup]);
        var value = values[prop].value;
          console.log(value);

          $("#"+lookup).val(obj[lookup]);


          console.log(obj);
          console.log("#"+lookup);

          console.log(obj[lookup]);
          console.log(obj);

          // $("#"+lookup).val(details.get(lookup));

          // console.log(name);
          // console.log(details.get(lookup));
          // console.log("#"+lookup);
          // console.log();

          // var value = values[prop].value;
          // console.log(value);
          // console.log(ObjectID);
      };
};


$(".save").click(function(){

    // if(animating) return false;
    
        
    
//     $("#msform").validate({
//   rules: {
   
//       required: true,
//       email: true
//   }
// });

//     current_fs = $(this).parent();
// console.log(current_fs);

    $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore, :hidden"
        }); 

       
    // console.log($(this).parent());
    // console.log($(this).parent().valid());
    // console.log($(this).valid());

    console.log($("#msform").valid());
        // GET VALUES FROM ARRAY OF INPUTS
        var test = $(this).parent().serializeArray();
        console.log(test);
        var check = checkifValid(test);

    if(check){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        obj.current = next_fs;
            console.log(obj.current);

<<<<<<< HEAD
        var test2 = next_fs.serializeArray();
        console.log(test2);
=======
        animating = true;
>>>>>>> origin/master

        // get values for next page
        var values = $(this).parent().serializeArray();


        // GET VALUES FROM ARRAY OF INPUTS
        // var values = $(this).parent().serializeArray();
        // console.log(values);


        // var submitted = true;
        if(obj.submitted) {
            console.log(obj.id);
            // var email = loadDetails(ObjectID);
            // console.log(email);
            // var id = getObjectID(values);
            // console.log(id);

            //add parse
            var tester = Parse.Object.extend(DB);
            var query = new Parse.Query(tester);
            event.preventDefault();
            query.get(obj.id, {
                success: function(details) {
                    for (var prop in values) {
                      var name = values[prop].name;
                      console.log(name);
                      var value = values[prop].value;
                      console.log(value);

                        // add to PARSE
                        details.set(name, value);

                             details.save(null, {
                              success: function(details) {
                                console.log("success");
                              },
                              error: function(details, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                alert('Failed to create new object, with error code: ' + error.message);
                              }
                            });
                    };
                },
                error: function(object, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
        
            });
            
            shiftPage(current_fs,next_fs);
            getInfo(obj.id,next_fs);

        } else {
            //add parse
            
            if(obj.first === true) {
                var User = Parse.Object.extend(DB);
                var trial = new User();
                trial.set("submitted",true);
                trial.save(null, {
                  success: function(trial) {
                    // Execute any logic that should take place after the object is saved.
                    alert('New object created with objectId: ' + trial.id);
                    var test = trial.id;
                    obj.id = test;
                  },
                  error: function(trial, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                  }
                });


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

                console.log(test);
            } else {
                var trial = Parse.Object.extend(DB);
                var query = new Parse.Query(trial);
                query.get(obj.id, {
                  success: function(trial) {
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
                  },
                  error: function(User, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to get old object, with error code: ' + error.message);
                  }
                });

            }
            

            

            obj.first = false;
            shiftPage(current_fs,next_fs);
            
        }


        
    } else {
        alert("Please Fill out all the Required Information");
    }
    
    
   
});


function shiftPage(current_fs, next_fs) {
    //activate next step on progressbar using the index of next_fs
        // $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        $("#progressbar li").eq(next_fs.index()-1).addClass("active");
   
        //show the next fieldset
        next_fs.show(); 
        obj.current = next_fs;
            console.log(obj.current);

        // current_fs.hide();
        // hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                // scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                // current_fs.css({'transform': 'scale('+scale+')'});
                next_fs.css({'left': left, 'opacity': opacity});
            }, 
            duration: 800, 
            complete: function(){
                current_fs.hide();
            }, 
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });



}

function checkifValid(values) {
    for (var prop in values) {
        var value = values[prop].value;
        if(value === "") {
           return false;
        }
    }
    return true;
}


$(".previous").click(function(){
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //de-activate current step on progressbar
    // $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show(); 
    obj.current = previous_fs;
        console.log(obj.current);


    // current_fs.hide();
    // hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            // scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1-now) * 50)+"%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });

});

$(".next").click(function(){

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    $("#msform").validate({
            errorPlacement: $.noop,
            ignore: ".ignore, :hidden"
        }); 

    console.log($("#msform").valid());
        // GET VALUES FROM ARRAY OF INPUTS
        var test = current_fs.serializeArray();
        console.log(test);

        var check = checkifValid(test);

    if(check) {
        shiftPage(current_fs, next_fs);
        if(obj.submitted) {
            getInfo(obj.id,next_fs);
        }
    } else {
        alert("Please Fill out all the Required Information");
    }    

})




