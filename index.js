const input = document.querySelector('input')
const btn = document.querySelector('button')
const output = document.querySelector('.output')
const wrapper = document.querySelector('.wrapper')

let isClicked = 0
let elem, perviousPos

btn.addEventListener('click', () => {
  Array.from(input.value).map(e => output.innerHTML += `<span class='letter' onclick='handleClick(event)'>${e}</span>`)
  input.value = ''
  setLettersPosition()
})

const setLettersPosition = () => {
  const str = Array.from(document.querySelectorAll('span'))
  str.forEach(e => {
    e.style.left = e.getBoundingClientRect().left + 'px'
    e.style.top = e.getBoundingClientRect().top + 'px'
  })
  str.forEach(e => e.style.position = 'absolute')
}

const handleClick = e => {
  elem = e.target
  if (!isClicked) {
    elem.style.zIndex = 100;
    perviousPos = {
      top: elem.getBoundingClientRect().top,
      left: elem.getBoundingClientRect().left
    }
    document.body.append(elem);
    document.addEventListener('mousemove', onMove)
    isClicked++
  } else {
    elem.hidden = true
    let elBelow = document.elementFromPoint(e.clientX, e.clientY)
    elem.hidden = false
    if (!elBelow) return
    let dropBelow = elBelow.closest('.letter');
    if (dropBelow) {
      dropBelow.style.left = perviousPos.left + 'px'
      dropBelow.style.top = perviousPos.top + 'px'
    }
    document.removeEventListener('mousemove', onMove)
    isClicked--
  }
}

function onMove(event) {
  movingTo(event.pageX, event.pageY)
}

function movingTo(x, y) {
  elem.style.left = x - elem.offsetWidth / 2 + 'px'
  elem.style.top = y - elem.offsetHeight / 2 + 'px'
}