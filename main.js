song = "";
leftWristX = 0;
leftWristy = 0;
rightWristX = 0;
rightWristy = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristy"+ leftWristy)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristy"+ rightWristy)
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#ADD8E6');
    stroke('#ADD8E6');

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristy,20);
    InNumberleftWristy = Number(leftWristy);
    remove_decimals = floor(InNumberleftWristy);
    leftWristy_divide_1000 = remove_decimals/1000
    volume = leftWristy_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}