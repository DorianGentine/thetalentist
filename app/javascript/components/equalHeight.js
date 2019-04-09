$( document ).ready(function() {
    var heights = $(".eql-height").map(function() {
        return $(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    $(".eql-height").height(maxHeight);
});
