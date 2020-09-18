import {MagnosticStore} from './store'

export type MagnosticClassName = {
	(): string
	className: string
    styles: string
    template: TemplateStringsArray
    toString: () => string
}

const globalStore: MagnosticStore = new MagnosticStore()

export const css = (
    template: TemplateStringsArray,
    ...props: (MagnosticClassName | string | number | Function)[]
): MagnosticClassName => globalStore.css(template, ...props)

export type { MagnosticStore }
export const extractCss = (): string => globalStore.extractCss()
export const createStore = (): MagnosticStore => new MagnosticStore()