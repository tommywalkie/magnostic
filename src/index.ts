import type {MagnosticClassName, MagnosticProp} from './css'
import {MagnosticStore} from './store'

const globalStore: MagnosticStore = new MagnosticStore()

export const css = (
    template: TemplateStringsArray,
    ...props: MagnosticProp[]
): MagnosticClassName => globalStore.css(template, ...props)

export type { MagnosticClassName, MagnosticStore, MagnosticProp }
export const extractCss = (): string => globalStore.extractCss()
export const createStore = (): MagnosticStore => new MagnosticStore()