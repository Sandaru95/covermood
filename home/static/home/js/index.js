/* ===================== Content */
/* ================== 1. Placeholders */
/* ================== 2. General */
/* ================== 3. On Load */
// ::: Progress Bar
// ::: Step 1 Section Shows

// ======================================== 1. Placeholder
// :: Step 1
let selectedSongIndex = 0;
let selectedSong;
// ======================================== 2. General
// Ghost image drag disable
for(img of document.getElementsByTagName('img')){img.setAttribute('draggable', false)};

function setHelpText(text){
    const helpI = document.getElementById('help-i');
    helpI.setAttribute('onclick', `alertify.alert('${text}').set('resizable', true).set('basic', true)`);
}

function returnStepSections(){
    const step1Section = document.getElementById('step-1-section');
    const step2Section = document.getElementById('step-2-section');
    const step3Section = document.getElementById('step-3-section');
    const step4Section = document.getElementById('step-4-section');
    return {step1Section,step2Section,step3Section,step4Section};
};
function loadSampleToGraph(){
    y = [.1, .2, .1, .2, .3, .2];
    x = ['', '', '', '', '', ''];
    new Chartist.Line('#step-2-chart', {
        labels: x,
        series: [y],
    },{
        low: -.1,
        high: 6
    });
};
function step1NextSubmission(){
    // References
    const progressSection = document.getElementById('progress-section');
    const step1Select = document.getElementById('step-1-select');
    const { step1Section, step2Section, step3Section, step4Section} = returnStepSections();
    step3Section.style.display = "none";
    step4Section.style.display = "none";
    // Load Sample To Step 2 Graph
    setTimeout(loadSampleToGraph, 1000);
    // Progress Bar Flows
    progressSection.innerHTML = `
        <div class="progress red">
            <div class="indeterminate white"></div>
        </div>
        <h4>Step 1: Selecting Song</h4>
    `;
    // Hiding Showed Section
    step1Section.classList.remove('pulse');
    setTimeout(() => {
        step1Section.classList.add('animated', 'fadeOutLeftBig');
        setTimeout(() => step1Section.style.display = "none", 300);
    }, 300);
    // Showing Next Section
    setTimeout(() => {
        step2Section.style.display = "block";
        step2Section.classList.add('animated', 'fadeInRightBig');
    }, 500);
    // Setting the New Help Text
    setHelpText("Here You can start recording the cover by pressing the record button. After done recording just press the recording button again then the button for getting to next step will be appear.")
    // Progress Bar Flows
    setTimeout(() => {
        progressSection.innerHTML = `
            <div class="progress red">
                <div class="determinate white" style="width: 50%"></div>
            </div>
            <h4>Step 2: Recording Voice</h4>
        `;
    }, 1300);
};
function step2NextSubmission(){
    // References
    const progressSection = document.getElementById('progress-section');
    const hiddenAudio = document.getElementById('hidden-audio');
    const { step1Section, step2Section, step3Section, step4Section} = returnStepSections();
    step1Section.style.display = "none";
    step4Section.style.display = "none";
    // Progress Bar Flows
    progressSection.innerHTML = `
        <div class="progress red">
            <div class="indeterminate white"></div>
        </div>
        <h4>Step 2: Recording Voice</h4>
    `;
    // Stopping Audio Playings
    soundFile.pause();
    hiddenAudio.load();
    // Hiding Showed Section
    step2Section.classList.remove('pulse');
    setTimeout(() => {
        step2Section.classList.add('animated', 'fadeOutLeftBig');
        setTimeout(() => step2Section.style.display = "none", 300);
    }, 300);
    // Showing Next Section
    setTimeout(() => {
        step3Section.style.display = "block";
        step3Section.classList.add('animated', 'fadeInRightBig');
    }, 500);
    // Setting the New Help Text
    setHelpText("Here You fine tune the voice using factors like volume, pan and sample rate.")
    // Progress Bar Flows
    setTimeout(() => {
        progressSection.innerHTML = `
            <div class="progress red">
                <div class="determinate white" style="width: 80%"></div>
            </div>
            <h4>Step 3: Fine Tune Voice</h4>
        `;
    }, 1300);
};
function step3NextSubmission(){
    // References
    const progressSection = document.getElementById('progress-section');
    const hiddenAudio = document.getElementById('hidden-audio');
    const { step1Section, step2Section, step3Section, step4Section} = returnStepSections();
    step1Section.style.display = "none";
    step2Section.style.display = "none";
    // Progress Bar Flows
    progressSection.innerHTML = `
        <div class="progress red">
            <div class="indeterminate white"></div>
        </div>
        <h4>Step 3: Fine Tune Voice</h4>
    `;
    // ======================================= Sending the Sound File to Server
    let soundBlob = soundFile.getBlob();
    let data = new FormData();
    console.log(soundBlob);
    data.append('soundBlob', soundBlob, 'savedFile.wav');
    data.append('csrfmiddlewaretoken', $("input[name='csrfmiddlewaretoken']").val());
    data.append('pk', String(selectedSong.pk))
    // Stopping Audio Playings
    soundFile.pause();
    hiddenAudio.load();
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: '/home/returnMixedSound/',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        data: data,
        success: function (data) {
            // Hiding Showed Section
            step3Section.classList.remove('pulse');
            setTimeout(() => {
                step3Section.classList.add('animated', 'fadeOutLeftBig');
                setTimeout(() => step3Section.style.display = "none", 300);
            }, 300);
            // Setting Newly Merged Record To Hidden Audio
            hiddenAudio.firstElementChild.setAttribute('src', data);
            hiddenAudio.load();
            // Showing Next Section
            setTimeout(() => {
                step4Section.style.display = "block";
                step4Section.classList.add('animated', 'fadeInRightBig');
            }, 500);
            // Setting the New Help Text
            setHelpText("Everything is a success! Now You can share or download Your cover record")
            // Progress Bar Flows
            setTimeout(() => {
                progressSection.innerHTML = `
                    <div class="progress red">
                        <div class="determinate white" style="width: 100%"></div>
                    </div>
                    <h4>Step 4: Share and Download</h4>
                `;
            }, 1300);      
        }
    });
};
// ======================================== 3. On Load
// ::: First Time Visitor
((global) => {
    if (localStorage.getItem('notFirstTime')){}else{
        alertify.alert(`
            Welcome To Online Sound Studio. Here You Can Sing and Record Songs. Just press the help button on top right for help.
        `).set('resizable', true).set('basic', true);
        localStorage.setItem('notFirstTime', true);
    };
})(window);
// ::: Progress Bar
((global) => {
    // References
    const progressSection = document.getElementById('progress-section');
    setTimeout(() => {
        progressSection.innerHTML = `
            <div class="progress red">
                <div class="determinate white" style="width: 20%"></div>
            </div>
            <h4>Step 1: Selecting Song</h4>
        `;
    }, 2050);
})(window);
// ::: Step 1 Section Song Listed
((global) => {
    // References
    const step1Select = document.getElementById('step-1-select');
    let tempView = `<option value="" disabled selected>Select Song That You Wish</option>`;  
    for(let i = 0; i < musicList.length; i++){
        tempView += `<option value="${i}">${musicList[i].name}</option>`
    };
    // To Front
    step1Select.innerHTML = tempView;
})(window);
// ::: Step 1 Section Shows
((global) => {
    // References
    const step1Section = document.getElementById('step-1-section');
    setTimeout(() => {
        step1Section.style.display = "block";
        step1Section.classList.add('animated', 'pulse');
    }, 2300); 
})(window);















// ======================================== 4. Section 1
// ::: Select
function step1SelectChanged(select){
    // References
    const step1NextBtn = document.getElementById('step-1-next');
    const step1SectionImg = document.getElementById('step-1-section-img');
    const step2Lyrics = document.getElementById('step-2-lyrics');
    // Toast
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    }).fire({
        icon: 'info',
        title: `${musicList[Number(select.value)].name} Selected!`
    });
    // Current Selected Song 
    selectedSongIndex = Number(select.value);
    selectedSong = musicList[selectedSongIndex];
    // Setting the Image
    if(step1SectionImg.classList.contains('zoomInUp')){
        step1SectionImg.classList.remove('zoomInUp');
    }
    step1SectionImg.classList.add('animated', 'zoomOutDown');
    setTimeout(() => {
        step1SectionImg.src = musicList[Number(select.value)].coverUrl;
        step1SectionImg.classList.remove('animated', 'zoomOutDown');
        step1SectionImg.classList.add('animated', 'zoomInUp');
    }, 1200);
    // Step 2 Lyrics
    step2Lyrics.innerText = selectedSong.lyrics.replace(/&#x27;/g, "'");
    // Next Btn
    step1NextBtn.style.display = "block";
    if(step1NextBtn.classList.contains('animated')){
        step1NextBtn.classList.remove('animated', 'bounce');
        setTimeout(() => step1NextBtn.classList.add('animated', 'bounce'), 100);
    }else{
        step1NextBtn.classList.add('animated', 'bounce');
    };
};
// ::: Batman
setTimeout(() => {
    // References
    const batManDiv = document.getElementById('running-batman');
    batManDiv.style.display = "block";
    for(let i = 0; i < 101; i++){
        setTimeout(() => {
            batManDiv.style.left = `${i}%`;
        }, i * 100);
    };
}, 5000);



















// ======================================== 4. Section 2
// ::: Recording Button
function step2RecordSubmission(button){
    // References
    const hiddenAudio = document.getElementById('hidden-audio');
    let step2Timer = document.getElementById('step-2-timer');

    let step2CurrentlyRecording = true;
    // Start Record Or Done Record
    if(button.firstElementChild.innerHTML == "mic"){
        // References
        document.getElementById('step-2-timer-parent').innerHTML = `<i id="step-2-timer"></i>s`;
        let step2Timer = document.getElementById('step-2-timer');
        // Record Start : States
        step2CurrentlyRecording = true;
        // Record Start : Icons Changes
        button.firstElementChild.innerHTML = "stop";
        if(hiddenAudio.firstElementChild.getAttribute('src')){
            hiddenAudio.firstElementChild.setAttribute('src', selectedSong.musicUrl);
            hiddenAudio.firstElementChild.setAttribute('type', "audio/mpeg");
            // Newly Loading the Song
            hiddenAudio.load();
            // Record Start : Clear all Sessions
            soundFile.stop();
        }else{
            hiddenAudio.firstElementChild.setAttribute('src', selectedSong.musicUrl);
            hiddenAudio.firstElementChild.setAttribute('type', "audio/mpeg");
            // Newly Loading the Song
            hiddenAudio.load();
            // Record Start : Clear all Sessions
            soundFile.stop();
        };
        // Record Start : Front Timer Reset
        step2Timer.innerHTML = "0";
        // Record Start : Play Karoake
        hiddenAudio.play();
        // Record Start : Start Record New Session
        recorder.record(soundFile);
        // Record Start : Graphing
        let y = [];
        let x = [];
        let i = 0;
        step2ListenInterval = setInterval(() => {
            y.push(mic.getLevel());
            x.push('');
            new Chartist.Line('#step-2-chart', {
                labels: x,
                series: [y],
            },{
                low: -.1,
                high: 6
            });
            // Removing Items From Start
            if (i > 5){
                x.shift();
                y.shift();
            };
            // Front Timer
            if (i % 20 == 0 && step2CurrentlyRecording) step2Timer.innerHTML = String(Number(step2Timer.innerHTML) + 1);
            // Iteration Increment
            i++;
        }, 50);
    }else if(button.firstElementChild.innerHTML == "chevron_right"){
        // ============= To Next Step
        step2NextSubmission();
    }else{
        // ============= Done Recording 
        // :: State Update
        step2CurrentlyRecording = false;
        document.getElementById('step-2-timer-parent').innerHTML = `<i id="step-2-timer">Recording Finished</i>`;
        // :: Icon
        button.firstElementChild.innerHTML = "chevron_right";
        // :: Stopping the Timer
        clearInterval(step2ListenInterval);
        // Stopping the Song
        hiddenAudio.pause();
        // :: Logic
        recorder.stop();
    };
};
























// ======================================== 4. Section 3
function step3PlaySubmission(button){
    if(button.firstElementChild.innerHTML == "play_arrow"){
        // Sound Playing
        soundFile.play();
        // Setting Icon
        button.firstElementChild.innerHTML = "pause";
    }else{
        // Sound Paused
        soundFile.pause();
        // Setting Icon
        button.firstElementChild.innerHTML = "play_arrow"
    }
};
// :: Adjusters
function step3AdjVolume(newVolume){
    // References
    const step3Play = document.getElementById('step-3-play');
    // Stopping Current Playing Sessions
    soundFile.pause();
    step3Play.firstElementChild.innerHTML = "play_arrow";
    // Setting the Volume
    soundFile.setVolume(newVolume / 100);
};
function step3AdjPan(newPan){
    // References
    const step3Play = document.getElementById('step-3-play');
    // Stopping Current Playing Sessions
    soundFile.pause();
    step3Play.firstElementChild.innerHTML = "play_arrow";
    // Setting the New Pan
    soundFile.pan(newPan);
};
function step3AdjRate(newRate){
    // References
    const step3Play = document.getElementById('step-3-play');
    // Stopping Current Playing Sessions
    soundFile.pause();
    step3Play.firstElementChild.innerHTML = "play_arrow";
    // Setting the new Rate
    soundFile.rate(newRate);
};




















// ======================================== 4. Section 4
function step4Loop(){
    // References
    const progressSection = document.getElementById('progress-section');
    const { step1Section, step2Section, step3Section, step4Section} = returnStepSections();
    const hiddenAudio = document.getElementById('hidden-audio');
    // Stopping all current playing sessions of audio
    hiddenAudio.pause();
    hiddenAudio.load();
    // P5.JS Reset 
    mic, recorder, soundFile = null;
    state = 0;
    setup();
    selectedSongIndex = 0;
    selectedSong = null;

    // Transition Animation
    step1Section.style.display = "none";
    step2Section.style.display = "none";
    step3Section.style.display = "none";
    // Progress Bar Flows
    progressSection.innerHTML = `
        <div class="progress red">
            <div class="indeterminate white"></div>
        </div>
        <h4>Step 1: Recording Voice</h4>
    `;
    // Hiding Showed Section
    step4Section.classList.remove('animated', 'fadeInRightBig');
    setTimeout(() => {
        step4Section.classList.add('animated', 'fadeOutRightBig');
        setTimeout(() => step4Section.style.display = "none", 300);
    }, 300);
    // Showing First Section
    setTimeout(() => {
        step1Section.style.display = "block";
        step1Section.classList.remove('fadeOutLeftBig');
        step2Section.classList.remove('fadeOutLeftBig');
        step3Section.classList.remove('fadeOutLeftBig');
        step4Section.classList.remove('fadeOutLeftBig');
        step4Section.classList.remove('fadeOutRightBig');
        step1Section.classList.add('animated', 'fadeInLeftBig');
        // Doing The Reset Behaviour Set
        document.getElementById('step-1-next').style.display = "none";
        document.getElementById('step-2-timer-parent').innerHTML = "";
        document.getElementById('step-2-record').style.display = "inline-block";
        document.getElementById('step-2-record').innerHTML = `<i class="material-icons">mic</i>`;
        document.getElementById('step-2-next').style.display = "none";
    }, 1000);
    // Progress Bar Flows
    setTimeout(() => {
        progressSection.innerHTML = `
            <div class="progress red">
                <div class="determinate white" style="width: 10%"></div>
            </div>
            <h4>Step 1: Recording Voice</h4>
        `;
    }, 1000);
};
function step4Download(){
    // References
    let hiddenAudio = document.getElementById('hidden-audio');

    let generatedAudioUrl = hiddenAudio.firstElementChild.getAttribute('src');
    window.open(generatedAudioUrl, "_blank");
};

function step4Play(button){
    // References
    let hiddenAudio = document.getElementById('hidden-audio');

    if(button.firstElementChild.innerHTML == "play_arrow"){
        hiddenAudio.load();
        hiddenAudio.play();
        // Changing the Icon
        button.firstElementChild.innerHTML = "pause";
    }else{
        hiddenAudio.pause();
        // Changing the Icon
        button.firstElementChild.innerHTML = "play_arrow";
    };
};