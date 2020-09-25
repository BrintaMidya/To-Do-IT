
$("#notDone").on("click", "li", function(){
    temp = $(this).html();
    $(this).fadeOut(150,function(){
        $("#done").append("<li>"+temp+"</li>");
    })
});

$("#done").on("click", "li", function(){
    temp = $(this).html();
    $(this).fadeOut(150,function(){
        $("#notDone").append("<li>"+temp+"</li>");
    })
});

$("ul").on('mouseenter', 'li', function() {
    $(this).find("span").css('opacity','.8');
});
$("ul").on('mouseleave', 'li', function() {
    $(this).find("span").css('opacity','.3');
});

$("ul").on('mouseenter', 'li', function() {
    $(this).toggleClass("textHighlight");
});
$("ul").on('mouseleave', 'li', function() {
    $(this).toggleClass("textHighlight");
});

$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(200, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        var txt = $(this).val();
        $(this).val("");
        $("#notDone").append("<li><span><img src='./Assets/graphics/clear.svg' alt='delete'></span>"+txt+"</li>");
    }
});
