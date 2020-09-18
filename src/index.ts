import type {MagnosticStyle} from './css'
import type {MagnosticKeyframes} from './keyframes'
import type {MagnosticProp, MagnosticElement, MagnosticElementTypeAlias, MagnosticElementTypePrefix, MagnosticElementTypeSelector, MagnosticElementTypeSettings} from './element'
import {MagnosticStore} from './store'

const globalStore: MagnosticStore = new MagnosticStore()

export const css = (
	template: TemplateStringsArray,
	...props: MagnosticProp[]
): MagnosticStyle => globalStore.css(template, ...props)

export const keyframes = (
	template: TemplateStringsArray,
	...props: MagnosticProp[]
): MagnosticKeyframes => globalStore.keyframes(template, ...props)

export type {MagnosticElement, MagnosticStyle, MagnosticKeyframes, MagnosticStore, MagnosticProp, MagnosticElementTypeAlias, MagnosticElementTypePrefix, MagnosticElementTypeSelector, MagnosticElementTypeSettings}
export const extractCss = (): string => globalStore.extractCss()
export const createStore = (): MagnosticStore => new MagnosticStore()
