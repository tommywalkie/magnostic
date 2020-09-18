import {suite} from 'uvu'
import {ok, is} from 'uvu/assert'
import {isMatch} from 'picomatch'
import {createStore} from '..'
import type {MagnosticKeyframes, MagnosticStyle} from '..'

const $: uvu.Test<Record<string, any>> = suite('keyframes')

const store = createStore()
const {css, keyframes, extractCss} = store

const slideIn: MagnosticKeyframes = keyframes`
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
`

const bounce: MagnosticKeyframes = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const bouncingText: MagnosticStyle = css`
  animation: ${bounce} 1s ease infinite;
`

$('should output keyframe identifier when strigified', async () => {
	ok(isMatch(`${slideIn}`, 'anim-(*)'))
	ok(isMatch(slideIn.toString(), 'anim-(*)'))
})

$('should output keyframe code correctly', async () => {
	is(slideIn.styles, `@keyframes ${slideIn}{from{margin-left:100%;width:300%;}to{margin-left:0%;width:100%;}}`)
})

$('should apply animation to a selector', async () => {
	is(bouncingText.styles, `.${bouncingText}{animation: ${bounce} 1s ease infinite;}`)
	is(extractCss(), `${slideIn.styles}${bounce.styles}${bouncingText.styles}`)
})

$.run()
