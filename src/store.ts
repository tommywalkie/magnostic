import type {MagnosticElement, MagnosticProp} from './element'
import {MagnosticStyle} from './css'
import {MagnosticKeyframes} from './keyframes'

export class MagnosticStore {
	elements: MagnosticStyle[]
	constructor() {
		this.elements = []
	}

	extractCss = (): string => this.elements.map(
		(element: MagnosticElement): string => element.styles
	).join('')

	css = (
		template: TemplateStringsArray,
		...props: MagnosticProp[]
	): MagnosticStyle => {
		const className: MagnosticStyle = new MagnosticStyle(template, ...props)
		this.elements.push(className)
		return className
	}

	keyframes = (
		template: TemplateStringsArray,
		...props: MagnosticProp[]
	): MagnosticKeyframes => {
		const className: MagnosticKeyframes = new MagnosticKeyframes(template, ...props)
		this.elements.push(className)
		return className
	}
}
