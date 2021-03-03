let canvasWidth = window.innerWidth
let canvasHeight = window.innerHeight
let svg = Snap(canvasWidth, canvasHeight)
    // const animations = [animate1, animate2, animate3, animate4, animate5, animate6];
const animations = [animate1, animate2, animate3, animate4, animate5, animate6]
svg.addClass('animation');

function changeRadian(angle) {
    return (Math.PI / 180) * angle
}

function getRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start
}

function svgRemove() {
    let list = svg.node.children;
    while (list.length > 40) {
        list[0].remove();
    }
}

function getRandomColor() {
    let color = [
        '#f9f8e6',
        '#ff8b8b',
        '#61bfad',
        '#f9f7e8',
        '#f9f7e8',
        '#61bfad',
        '#ffffff',
        '#e54b4b',
        '#167c80',
        '#f03f35',
        '#b7e3e4',
        '#fff3b2',
        '#ffe0d8',
        '#ff9b93',
        '#41584b',
        '#f03f35',
        '#efe8d8',
        '#28292b',
        '#e57066',
        '#32b67a',
        '#000000',
        '#facac0',
        '#e6625e',
        '#0bbcda',
        '#d31b33',
        '#fdfo6f',
        '#1fc8e6',
        '#ffefe5',
        '#008fd3',
        '#f4c7ee',
        '#fde3c8',
        '#055a58',
    ];
    let index = Math.floor(getRandomNumber(0, color.length - 1))
    return color[index]
}

function animate1() {
    let set = Snap.set()
    let smallRadius = getRandomNumber(20, 40)
    let num = getRandomNumber(5, 15)
    let angle = 360 / num
    let bigRadius = getRandomNumber(100, 300)
    let color = getRandomColor()
    for (let i = 0; i < num; i++) {
        (function(i) {
            setTimeout(() => {
                set.push(
                    svg.circle({
                        cx: canvasWidth / 2 + Math.cos(changeRadian(i * angle)) * bigRadius - canvasWidth / 6,
                        cy: canvasHeight / 2 + Math.sin(changeRadian(i * angle)) * bigRadius,
                        r: smallRadius,
                        fill: color
                    })
                )
            }, 20 * i)
        })(i)
    }
    Snap.animate(0, smallRadius, function(val) {
        set.attr({ r: val })
    }, 50, mina.easeout, function() {
        setTimeout(() => {
            set.forEach(element => {
                element.animate({
                    cx: getRandomNumber(0, 2 * canvasWidth / 3),
                    cy: getRandomNumber(0, canvasHeight),
                    r: 0
                }, 500, mina.easeout)
            });
        }, 500)
    })
    svgRemove()
}


function animate2() {
    let set = Snap.set()
    let num = getRandomNumber(8, 12)
    for (let i = 0; i < num; i++) {
        let color = getRandomColor()
        set.push(svg.circle({
            cx: Math.random() * 2 * canvasWidth / 3,
            cy: Math.random() * canvasHeight,
            fill: color
        }))
    }
    set.forEach(element => {
        let radius = getRandomNumber(5, 50)
        Snap.animate(0, radius, function(val) {
            element.attr({
                r: val
            })
        }, 500, mina.bounce, function() {
            element.animate({
                r: 0
            }, 500, mina.easeout)
        })
    })
    svgRemove()
}


function animate3() {
    let set = Snap.set()
    let num = getRandomNumber(15, 20)
    let color = getRandomColor()
    for (let i = 0; i < num; i++) {
        set.push(svg.circle({
            fillOpacity: 0,
            stroke: color,
            strokeWidth: 4
        }))
    }
    set.forEach(element => {
        let radius = getRandomNumber(5, 50)
        Snap.animate([0, canvasWidth / 3, canvasHeight / 2], [radius, getRandomNumber(0, canvasWidth * 2 / 3), getRandomNumber(0, canvasHeight)], function(val) {
            element.attr({
                r: val[0],
                cx: val[1],
                cy: val[2]
            })
        }, 500, mina.easeout, function() {
            element.animate({
                r: 0
            }, 300, mina.backin)
        })
    })
    svgRemove()
}


function animate4() {
    let set = Snap.set()
    let num = getRandomNumber(5, 15)
    let color = getRandomColor()
    for (let i = 0; i < num; i++) {
        set.push(
            svg.paper.rect({
                stroke: color,
                strokeWidth: 4,
                fillOpacity: 0
            })
        )
    }
    set.forEach(element => {
        let x1 = getRandomNumber(0, 2 * canvasWidth / 3)
        let y1 = getRandomNumber(0, canvasHeight)
        let x2 = x1 + getRandomNumber(-100, 100)
        let y2 = y1 + getRandomNumber(-100, 100)
        let width = getRandomNumber(10, 80)
        Snap.animate(
            [x1, y1, 0, 0], [x2, y2, 100, width],
            function(val) {
                let cur = new Snap.Matrix()
                cur.rotate(val[2] * 5 / 6, x2 + width / 2, y2 + width / 2)
                element.attr({ x: val[0], y: val[1], width: val[3], height: val[3] })
                element.transform(cur)
            }, 800, mina.bounce,
            function() {
                set.animate({ width: 0, height: 0 }, 500, mina.backin)
            })
    })
    svgRemove()
}


function animate5() {
    let set = Snap.set()
    let num = getRandomNumber(8, 15)
    for (let i = 0; i < num; i++) {
        let color = getRandomColor()
        set.push(
            svg.paper.rect({
                fill: color
            })
        )
    }
    set.forEach(element => {
        let width = getRandomNumber(20, 100)
        Snap.animate(
            [canvasWidth / 3, canvasHeight / 2, 0, 0], [getRandomNumber(0, canvasWidth * 2 / 3), getRandomNumber(0, canvasHeight), width, width],
            function(val) {
                element.attr({ x: val[0], y: val[1], width: val[2], height: val[3] })
            }, 500, mina.bounce,
            function() {
                set.animate({ opacity: 0 }, 300, mina.easeout)
            }
        )
    })
    svgRemove()
}


function animate6() {
    let x1 = canvasWidth / 3
    let y1 = canvasHeight / 2
    let radius = getRandomNumber(30, 70)
    let shapes = ["circle", "rect"]
    let color = getRandomColor()
    let shape = shapes[getRandomNumber(0, shapes.length - 1)]
    if (shape == "circle") {
        let set = new Snap.set()
        Snap.animate(
            [1, radius], [15, getRandomNumber(800, 1600)],
            function(val) {
                set.push(
                    svg.paper.el("circle", {
                        cx: x1,
                        cy: y1,
                        r: val[1],
                        strokeWidth: val[0],
                        stroke: color,
                        fillOpacity: 0
                    })
                )
            }, 200, mina.elastic(),
            function() {
                set.animate({ opacity: 0 }, 500)
            }
        )
    }
    if (shape == "rect") {
        let rect = svg.paper.el("rect", {})
        Snap.animate(
            [radius, 1, 0], [getRandomNumber(500, 1200), 10, 100],
            function(val) {
                rect.attr({
                    width: val[0],
                    height: val[0],
                    x: x1 - rect.attr("width") / 2,
                    y: y1 - rect.attr("width") / 2,
                    stroke: color,
                    strokeWidth: val[1],
                    fillOpacity: 0
                })
                let cur = new Snap.Matrix()
                cur.rotate(val[2] * 5 / 6, x1, y1)
                rect.transform(cur)
            }, 500, mina.easeout,
            function() {
                rect.animate({ opacity: 0 }, 500)
            }
        )
    }
    svgRemove()
}