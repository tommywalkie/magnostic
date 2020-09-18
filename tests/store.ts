import {suite} from 'uvu'
import {is} from 'uvu/assert'
import {createStore} from '../'
import type {MagnosticClassName, MagnosticStore} from '../'

const $: uvu.Test<Record<string, any>> = suite('store')

$('should be able to setup an isolated store', async () => {
    const store: MagnosticStore = createStore()
    const { css, extractCss } = store
    is(extractCss(), '') // There should be nothing
    const redText: MagnosticClassName = css`
      color: red;
    `
    const blueText: MagnosticClassName = css`
      color: blue;
    `
    is(extractCss(), `.${redText}{color:red;}.${blueText}{color:blue;}`)
})

$('should be able to isolate multiple stores', async () => {
    // Create a first store
    const someStore = createStore()
    const { css, extractCss } = someStore
    const blueText = css`
      color: blue;
    `
    // Create another store
    const anotherStore = createStore()
    const { css: css2, extractCss: extractCss2 } = anotherStore
    const centerAlignedText = css2`
      text-align: center;
    `

    is(extractCss(), `.${blueText}{color:blue;}`)
    is(extractCss2(), `.${centerAlignedText}{text-align:center;}`)
})

$.run()