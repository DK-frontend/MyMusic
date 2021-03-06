const audio00 = "./assets/audio/沙锤.mp3";
const audio01 = "./assets/audio/脚鼓.mp3";
const audio02 = "./assets/audio/饶钹.mp3";
const audio10 = "./assets/audio/踏钹.mp3";
const audio11 = "./assets/audio/军鼓.mp3";
const audio12 = "./assets/audio/掌声.mp3";
let bgMusic = "./assets/audio/bgmusic1.mp3";
const musicFragments = [
    [audio00, audio01, audio02],
    [audio10, audio11, audio12]
]
const bgMusics = ["./assets/audio/bgmusic1.mp3", "./assets/audio/bgmusic2.mp3", "./assets/audio/bgmusic3.mp3", "./assets/audio/bgmusic4.mp3", "./assets/audio/bgmusic5.mp3"]
let bgChangeCount = 0

let recording = document.querySelector("#recording")
let notrecording = document.querySelector("#notrecording")
let bgMusicObj = null

let recordingSequence = []
let isRecording = false
const elmOverlay = document.querySelector('.shape-overlays');
const overlay = new ShapeOverlays(elmOverlay);
let lis = document.querySelectorAll(".slipdown li")

function changeBackground() {
    if (overlay.isAnimating) {
        return false
    }
    bgChangeCount++
    if (bgChangeCount % 10 === 0) {
        document.documentElement.style.setProperty("backgroundColor", getCurrentbgColor(bgChangeCount))
    } else if (bgChangeCount % 5 === 0) {
        document.querySelectorAll("svg path")[3].style.setProperty("fill", getCurrentbgColor(bgChangeCount))
    }
    if (bgChangeCount % 5 === 0) {
        overlay.toggle()
    }
}

function getCurrentbgColor(bgChangeCount) {
    const colors = ['#efcb7b', '#0d1831', '#ff9b83', '#61bfad']
    bgChangeCount /= 5
    return colors[bgChangeCount % 4]
}

function stroke(row, col) {
    new Audio(musicFragments[row][col]).play()
    changeBackground()
    if (isRecording) {
        recordingSequence.push({
            type: "music",
            time: Date.now(),
            audio: musicFragments[row][col],
            animation: animations[3 * row + col]
        })
    }
}

function startRecording() {
    bgChangeCount = 0
    setRecordingTrue()
    if (recordingSequence.length === 0) {
        bgMusicObj = new Audio(bgMusic)
        recordingSequence.push({
            type: "start",
            time: Date.now()
        })
    } else {
        recordingSequence.push({
            type: "restart",
            time: Date.now()
        })
    }
    bgMusicObj.volume = 0.3
    bgMusicObj.play()
}

function stopRecording() {
    bgMusicObj.pause()
    bgMusicObj = null
    setRecordingFalse()
    recordingSequence.push({
        type: "stop",
        time: Date.now()
    })
    replay()
    recordingSequence = []
}

function pauseRecording() {
    bgMusicObj.pause()
    setRecordingFalse()
    recordingSequence.push({
        type: "pause",
        time: Date.now()
    })
}

function setRecordingTrue() {
    isRecording = true
    document.querySelector("#recording").style.display = "block"
    document.querySelector("#notrecording").style.display = "none"
}

function setRecordingFalse() {
    isRecording = false
    document.querySelector("#recording").style.display = "none"
    document.querySelector("#notrecording").style.display = "block"
}

function normalizeSequence(sequence) {
    let curStartTime = 0
    let havePassedTime = 0
    let targetSeq = []
    for (let item of sequence) {
        switch (item.type) {
            case "start":
            case "restart":
                curStartTime = item.time
                break
            case "pause":
            case "stop":
                havePassedTime += item.time - curStartTime
                break
            case "music":
                targetSeq.push({
                    time: havePassedTime + (item.time - curStartTime),
                    audio: item.audio,
                    animation: item.animation
                })
                break
        }
    }
    return {
        duration: havePassedTime,
        sequence: targetSeq
    }
}

function replay() {
    const { duration, sequence } = normalizeSequence(recordingSequence)
    const replayBgMusicObj = new Audio(bgMusic)
    bgChangeCount = 0
    replayBgMusicObj.play()
    setTimeout(() => {
        replayBgMusicObj.pause()
    }, duration)
    for (let item of sequence) {
        setTimeout(() => {
            changeBackground()
            new Audio(item.audio).play()
            item.animation()
        }, item.time)
    }
}


document.querySelector("#startIcon").onclick = startRecording
document.querySelector("#stopIcon").onclick = stopRecording
document.querySelector("#pauseIcon").onclick = pauseRecording
    // document.querySelector(".slipdown").onmouseover = slipdown
    // document.querySelector("#file").onchange = loadFile

document.querySelector("#rect11").onclick = function() {
    stroke(0, 0)
    animations[0]()
}
document.querySelector("#rect12").onclick = function() {
    stroke(0, 1)
    animations[1]()
}
document.querySelector("#rect13").onclick = function() {
    stroke(0, 2)
    animations[2]()
}
document.querySelector("#rect21").onclick = function() {
    stroke(1, 0)
    animations[3]()
}
document.querySelector("#rect22").onclick = function() {
    stroke(1, 1)
    animations[4]()
}
document.querySelector("#rect23").onclick = function() {
    stroke(1, 2)
    animations[5]()
}
document.onkeyup = function(event) {
    switch (event.keyCode) {
        case 81:
            stroke(0, 0)
            animations[0]()
            break
        case 87:
            stroke(0, 1)
            animations[1]()
            break
        case 69:
            stroke(0, 2)
            animations[2]()
            break
        case 65:
            stroke(1, 0)
            animations[3]()
            break
        case 83:
            stroke(1, 1)
            animations[4]()
            break
        case 68:
            stroke(1, 2)
            animations[5]()
            break
        default:
            break
    }
}

for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        bgMusic = bgMusics[i - 1]
        bgMusicObj.pause()
        setRecordingFalse()
        recordingSequence = []
    }
}
// function slipdown() {
//     for (let i = 0; i < lis.length; i++) {
//         lis[i].style.display = "block"
//         lis[i].onclick = function() {
//             for (let j = 0; j < lis.length; j++) {
//                 lis[j].style.display = "none"
//             }
//             lis[i].style.display = "block"
//             bgMusic = bgMusics[i - 1]
//                 // bgMusic = "./assets/audio/bgmusic2.mp3"
//         }
//     }
// }

// function loadFile(file) {
//     var fileReader = new FileReader();
//     fileReader.onload = function() {
//         var result = this.result; //文件内容
//         //确定，将文件保存到本地存储中，替换现有的
//         try {
//             sessionStorage.setItem("music", result);
//             bgMusic = sessionStorage.getItem("music");
//         } catch (e) {
//             console.log("Storage failed: " + e);
//         }
//     };
//     fileReader.readAsText(file);
// }
setInterval(() => {
    if (bgMusicObj.ended) {
        recordingSequence = []
        setRecordingFalse()
    }
}, 1000);