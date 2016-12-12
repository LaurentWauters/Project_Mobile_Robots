/*function drawCircle() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(100,75,50,0,1.5*Math.PI);
	ctx.stroke();
}*/

$(document).ready(function() {
	$(".circle").hide();
})

$(".roboto-img").hover(function(){
	$("img").animate({
		"width": 200,
		"height": 200
	}, 1500);
})

$(".roboto-img").click(function(){
	$(".circle").slideToggle();
})
;