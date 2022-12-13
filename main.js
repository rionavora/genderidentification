//https://teachablemachine.withgoogle.com/models/9zV5_KsOj/model.json
Webcam.attach('#camera');
camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality:90
});
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9zV5_KsOj/model.json", modelLoaded);
function check() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_uri + '"/>';
    });
    img = document.getElementById('selfie_image');
    classifier.classify(img, gotResult);

}
function modelLoaded() {
    console.log("modelLoaded");
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
    
        gender = results[0].label;
        var synth=window.speechSynthesis;
        speak_data="it is"+gender;
        var utterthis=new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterthis);
        if (gender == "boy") {
            document.getElementById("result").innerHTML = '<img src="https://static.vecteezy.com/system/resources/previews/005/112/745/original/cartoon-happy-little-boy-raising-hands-free-vector.jpg"/>';
        }
        else {
            document.getElementById("result").innerHTML = '<img src="https://t3.ftcdn.net/jpg/02/45/34/90/360_F_245349044_TMxmWxPpnSzeuauvvQnuFe03ueXgS57m.jpg"/>';
        }
    }
}