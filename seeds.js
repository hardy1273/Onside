var mongoose = require("mongoose")
var Campground = require("./models/campground");
var Comment=require("./models/comment")
var data = [
    {
        name: "Camp Nou",
        image: "https://i.iplsc.com/camp-nou/0007ODBA2PDRO80E-C122-F4.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar sit amet ipsum id auctor. Praesent id lacinia ante. Vivamus tempus eleifend urna sed rutrum. Aliquam in ligula at magna finibus ultrices in in lacus. Donec ultrices semper justo, quis placerat risus ullamcorper vel. Cras magna nisl, pellentesque eget commodo quis, interdum ac nisi. Duis tristique condimentum dui sed consectetur. Vestibulum non erat hendrerit, elementum mauris eget, hendrerit nibh. Pellentesque erat diam, gravida a ante non, luctus malesuada nisi."

    },
    {
        name: "Santiago Bernabeu",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgN954Ifj8Yyx26WxZnyb4Djs2nq_Sn7TbPw&usqp=CAU",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar sit amet ipsum id auctor. Praesent id lacinia ante. Vivamus tempus eleifend urna sed rutrum. Aliquam in ligula at magna finibus ultrices in in lacus. Donec ultrices semper justo, quis placerat risus ullamcorper vel. Cras magna nisl, pellentesque eget commodo quis, interdum ac nisi. Duis tristique condimentum dui sed consectetur. Vestibulum non erat hendrerit, elementum mauris eget, hendrerit nibh. Pellentesque erat diam, gravida a ante non, luctus malesuada nisi."

    },
    {
        name: "Stamford Bridge",
        image: "https://cdn.civitatis.com/reino-unido/londres/tour-estadio-stamford-bridge.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar sit amet ipsum id auctor. Praesent id lacinia ante. Vivamus tempus eleifend urna sed rutrum. Aliquam in ligula at magna finibus ultrices in in lacus. Donec ultrices semper justo, quis placerat risus ullamcorper vel. Cras magna nisl, pellentesque eget commodo quis, interdum ac nisi. Duis tristique condimentum dui sed consectetur. Vestibulum non erat hendrerit, elementum mauris eget, hendrerit nibh. Pellentesque erat diam, gravida a ante non, luctus malesuada nisi."

     
    },


]
function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("removed")
        }
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added");

                    Comment.create(
                        {
                            text:"Best Stad ever!!!!!!",
                            author:"HARDIT"
                        }, function(err,comment){
                            if(err){
                                console.log(err)
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created comment")

                            }
                            

                        });

                }
            })
        })

    });


}


module.exports = seedDB;