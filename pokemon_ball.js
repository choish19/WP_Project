$(document).ready(function () {
	$("#intro").show();
	$("#game_start_button").on("click",function() {
		$("#intro").hide();
		$("#game_start").show();
	});
	$("#game_start_button").on("click",function() {
		$("#intro").hide();
		$("#game_start").show();
	});
	$("#setting_button").on("click",function() {
		$("#setting").addClass("popup");
		change_position($("#setting"));
		$("#setting").show();
	});
	$("#how_button").on("click",function() {
		$("#how_to_play").addClass("popup");
		change_position($("#how_to_play"));
		$("#how_to_play").show();
	});
	$("#descript_pokemon img").on("mouseover", function(){
		var new_image = $(this).attr("src").replace(".png","_select.png");
		$(this).attr("src", new_image);
	});
	$("#descript_pokemon img").on("mouseout", function(){
		var new_image = $(this).attr("src").replace("_select","");
		$(this).attr("src", new_image);
	});
	$("#descript_pokemon img").on("click", function() {
		var des_image = $(this).attr("src").replace("_select.png","_descript.jpg");
		var obj = $("img[src='"+des_image+"']");
		$("#descript").addClass("popup2");
		$("#descript").show();
		change_position($("#descript"));
		obj.show();
		$("#descript_img").slideDown("slow");
	});

	$(".close_button").on("click",function() {
		$(".popup").hide();
	});

	$(".close_button2").on("click",function() {
		$(".popup2").hide();
		$("#descript_img").hide();
		$("#descript_img img").hide();
	});

	$("#pre_button").on("click",function() {
		$("#game_start").hide();
		$("#intro").show();
	});
	$("#select_button").on("click",function () {
		$("#game_start").hide();
		$("#game_stage").show();
	});
	$("#start_pokemon img").on("mouseover", function(){
		var new_image = $(this).attr("src").replace(".png","_select.png");
		$(this).attr("src", new_image);
	});
	$("#start_pokemon img").on("click", function() {
		var new_image = $(this).attr("src").replace("select","selected");
		$(this).attr("src", new_image);
	});
	$("#start_pokemon img").on("mouseout", function(){
		var new_image = $(this).attr("src").replace("_select","");
		$(this).attr("src", new_image);
	});
	canvas_load();
	game_start();
});
var canvas;
var context;

var bar_list = ["fire_bar.jpg", "grass_bar.jpg","water_bar.jpg"];
var bar_upgrade_list = ["fire_bar_upgrade.jpg", "grass_bar_upgrade.jpg","water_bar_upgrade.jpg"];
var ball_list = ["BALL1.png"];

var pokemon;
var bar = bar_list[0];
var bar_x = 400;
var bar_y = 450;
var bar_w = 160;
var bar_h = 40;

var ball = ball_list[0];
var ball_r = 40;
var ball_x = 460;
var ball_y = 410;
var speed_x = 3;
var speed_y = -3;

var boxes=[];

var score_sum = 0;
var score = 0;
var life = 3;
var time = 60;

function change_position(obj) {
	var l = (obj.parent().width() - (obj.width()+2))/2;
	var t = (obj.parent().height() - (obj.height()+2))/2;
	obj.css({top:t,left:l});
}

function canvas_load(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext("2d");
}

function game_start() {
	init_var();
	createBox();
	draw();
	update_time();
	control();
}
function init_var() {
	bar_x = 400;
	bar_y = 450;
	ball_x = 460;
	ball_y = 410;
	boxes=[];
	score = 0;
	speed_x = 3;
	speed_y = -3;
	time = 60;
	update_score();
}

function update_time() {
	if(time >= -1){
		$("#time").text(": "+time);
		time--;
	}else clearInterval(timer);
}
var timer = setInterval(update_time, 1000);

function draw() {
	clear();
	draw_box();
	draw_bar();
	draw_ball();
	update_life();
	crash_wall();
    crash_bar();
    crash_bottom();
    crash_box();
    check_time();
}
function check_time() {
	if(time < -1)
		gameover();
}
var stop = setInterval(draw,10);

function clear() {
	context.clearRect(0, 0, 960, 490);
}
function createBox() {
    for(var i = 0 ; i < 10 ; i++) {
        boxes[i] = [];
        for(j = 0 ; j < 6 ; j++) {
            boxes[i][j] = {
                x:0,
                y:0,
                count:1,
                type:0,
                score:1
            }
            boxes[i][j].x = i*96;
            boxes[i][j].y = j*40;
        }
    }
}
function draw_box(){
    for(var i = 0 ; i < 10 ; i++){
        for(var j = 0 ; j < 6 ; j++){
            var x = boxes[i][j].x;
            var y = boxes[i][j].y;
            var type = boxes[i][j].type;
            var isExist = (boxes[i][j].count>0);
            var color = "#CFD5EA";
            if(isExist){
            	context.fillStyle = color ;
            	context.fillRect(x, y, 96-1, 40-1);
            }
        }
    }
}
function draw_bar() {
	var img = new Image();
	img.src = bar;
	context.drawImage(img, bar_x, bar_y, bar_w, bar_h);
}
function draw_ball() {
	var img = new Image();
	img.src = ball;
	context.drawImage(img,ball_x, ball_y, ball_r, ball_r);
	ball_x += speed_x;
	ball_y += speed_y;
}
function crash_wall(){
	if((ball_x <= 0) || (ball_x + ball_r >= 960))
        speed_x *= -1;
    if(ball_y <= 0)
        speed_y *= -1;
}
function crash_bar(){
	if(((ball_y+ball_r/2 > bar_y)&&(ball_y+ball_r/2 < bar_y+bar_h))&&(((ball_x+ball_r > bar_x)&&(ball_x+ball_r < bar_x+bar_w))||((ball_x > bar_x)&&(ball_x < bar_x+bar_w)))){
        speed_x *= -1;
    }

    if(((ball_x+ball_r/2 > bar_x)&&(ball_x+ball_r/2) < bar_x+bar_w)&&(((ball_y+ball_r > bar_y)&&(ball_y+ball_r < bar_y+bar_h))||((ball_y > bar_y)&&(ball_y < bar_y+bar_h)))){
    	speed_y *= -1;
    }
}
function crash_bottom(){
	if(ball_y > 490-ball_r)
		gameover();
}

function gameover() {
	life--;
	update_score_sum();
	update_life();
	show_stage();
	clearInterval(stop);
}
function show_stage() {
	$("#game_play").hide();
	$("#game_stage").show();
}

function crash_box(){
	for(i= 0 ; i < 10 ; i++) {
        for(j= 0 ; j < 6 ; j++) {
            if(boxes[i][j].count > 0) {
                var x = boxes[i][j].x;
                var y = boxes[i][j].y;
                if(((ball_y+ball_r/2 > y)&&(ball_y+ball_r/2 < y+40-1))&&(((ball_x+ball_r > x)&&(ball_x+ball_r < x+96-1))||((ball_x > x)&&(ball_x < x+96-1)))){
               		speed_x *= -1;
               		boxes[i][j].count--;
                }

               	if(((ball_x+ball_r/2 > x)&&(ball_x+ball_r/2) < x+96-1)&&(((ball_y+ball_r > y)&&(ball_y+ball_r < y+40-1))||((ball_y > y)&&(ball_y < y+40-1)))){
               		speed_y *= -1;
               		boxes[i][j].count--;
               	}
               	if(boxes[i][j].count==0){
               	    get_score(i,j);
               	    update_score();
            	}
            }
        }
    }
}
function get_score(i, j) {
	score += boxes[i][j].score;
}
function update_score() {
	var str = "SCORE : "+score;
	$(".score").text(str);
}
function update_score_sum() {
	score_sum += score;
	var str = "SCORE : "+ score_sum;
	$("#score_sum").text(str);
}
function update_life(){
	var str = "LIFE : "
	for(var i = 0 ; i < life ; i++)
		str += "<img src='BALL1.png' width='40px' height='40px'> ";
	$(".life").html(str);
}

var keypress = {};
function control() {
	setInterval(move_bar, 5);
	$(document).keydown(function(e){
		keypress[e.which.toString()] = true;
	});
	$(document).keyup(function(e){
		keypress[e.which.toString()] = false;
	});
};

function move_bar() {
	if(keypress['37'])//왼쪽 방향키
		if(bar_x-5 > 0)
			bar_x -= 5;
	if(keypress['39'])//오른쪽 방향키
		if(bar_x + bar_w + 5 < 960)
			bar_x += 5;
}
