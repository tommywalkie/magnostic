import {suite} from 'uvu'
import {ok, is} from 'uvu/assert'
import {isMatch} from 'picomatch'
import {css} from '..'
import type {MagnosticStyle} from '..'

const $: uvu.Test<Record<string, any>> = suite('css paradigm')

const redText: MagnosticStyle = css`
  color: red;
`

const blueTextContainer: MagnosticStyle = css`
  & > p {
    color: blue;
  }
`

const spacedBlueTextContainer: MagnosticStyle = css`
  padding: 10px;
  & > p {
    color: blue;
  }
`

const centerAlignedRedText: MagnosticStyle = css`
  ${redText}
  text-align: center;
`

const bigTextFontSize = 22
const bigTextFontSizeString = '22'
const bigText = (fontSize: any, unit: string): MagnosticStyle => css`
  font-size: ${fontSize}${unit};
`

const mediaQueryTest = css`
    font-size: 22px;
    @media (min-width: 720px) {
        font-size: 15px;
    }
`

const doubleMediaQueryTest = css`
    font-size: 22px;
    @media (min-width: 720px) {
        font-size: 15px;
    }
    @media (min-width: 400px) {
        font-size: 11px;
    }
`

$('should output className when strigified', async () => {
	ok(isMatch(`${redText}`, 'css-(*)'))
	ok(isMatch(redText.toString(), 'css-(*)'))
})

$('should have a \'styles\' attribute with style rules and classname', async () => {
	is(redText.styles, `.${redText}{color:red;}`)
})

$('should support nested selectors', async () => {
	const {styles} = blueTextContainer
	is(styles, `.${blueTextContainer}>p{color:blue;}`)
})

$('should support nested selectors without breaking root style rules', async () => {
	const {styles} = spacedBlueTextContainer
	is(styles, `.${spacedBlueTextContainer}{padding:10px;}.${spacedBlueTextContainer}>p{color:blue;}`)
})

$('should support composition', async () => {
	ok(isMatch(centerAlignedRedText.styles, '.css-(*){color:red;text-align:center;}'))
})

$('should support passing props', async () => {
	ok(isMatch(bigText(bigTextFontSize, 'px').styles, '.css-(*){font-size:22px;}'))
	ok(isMatch(bigText(bigTextFontSizeString, 'em').styles, '.css-(*){font-size:22em;}'))
})

$('should support media queries', async () => {
	is(
		mediaQueryTest.styles,
		`.${mediaQueryTest}{font-size:22px;}` +
        `@media (min-width: 720px){.${mediaQueryTest}{font-size:15px;}}`
	)
})

$('should support multiple media queries at once', async () => {
	is(
		doubleMediaQueryTest.styles,
		`.${doubleMediaQueryTest}{font-size:22px;}` +
        `@media (min-width: 720px){.${doubleMediaQueryTest}{font-size:15px;}}` +
        `@media (min-width: 400px){.${doubleMediaQueryTest}{font-size:11px;}}`
	)
})

$.run()
