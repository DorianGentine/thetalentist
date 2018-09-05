
$( document ).ready(function() {
    var heights = $(".eql-height").map(function() {
        return $(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    $(".eql-height").height(maxHeight);
});


// Si veut le faire un deuxième sur la même page
// $( document ).ready(function() {
//     var heights = $(".big-height").map(function() {
//         return $(this).height();
//     }).get(),

//     maxHeight = Math.max.apply(null, heights);

//     $(".big-height").height(maxHeight);
// });
