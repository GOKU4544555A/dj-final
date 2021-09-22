song1status=""
song2status=""
function setup(){
canvas=createCanvas(450,400)
video=createCapture(VIDEO)
canvas.center()
video.hide()          
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotPoses)
}
song1=""
song2=""
function preload(){
song1=loadSound("music.mp3")
song2=loadSound("favourite.mp3")
}
function play(){
song.play()
song.setVolume(1)
song.rate(1)
}
rightWristX=0
rightWristY=0
leftWristX=0
leftWristY=0
function draw(){
image(video,0,0,450,400)
song1status=song1.isPlaying()
song2status=song2.isPlaying()
fill("red")
stroke("red")
if (scoreRightWrist>0.2) {
  circle(rightWristX,rightWristY,20)
  song2.stop()
  if (song1status==false) {
    song1.play()
    document.getElementById("song").innerHTML="playing harrypotter "
  }
}
if (scoreLeftWrist>0.2) {
  song1.stop()
if (song2status==false) {
  song2.play()
  document.getElementById("song").innerHTML="playing clarx zig zag"
}
}
}
function modelLoaded(){
    console.log("modelLoaded")
}
function gotPoses(results){
  if (results.length>0) {
      console.log(results)
      rightWristX=results[0].pose.rightWrist.x
      rightWristY=results[0].pose.rightWrist.y
      leftWristX=results[0].pose.leftWrist.x
      leftWristY=results[0].pose.leftWrist.y
      scoreRightWrist=results[0].pose.keypoints[10].score
      scoreLeftWrist=results[0].pose.keypoints[9].score
    }  
}
scoreRightWrist=0
scoreLeftWrist=0
