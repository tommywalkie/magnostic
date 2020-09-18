import {compile, serialize, stringify} from 'stylis'
import {MagnosticStyle} from './css'
import {MagnosticKeyframes} from './keyframes'
import {customAlphabet} from 'nanoid'

const uniqueId: () => string = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

export type MagnosticProp = MagnosticElement | string | number
export enum MagnosticElementTypeAlias {
	STYLE = 'style',
	KEYFRAMES = 'keyframes'
}
export enum MagnosticElementTypeSelector {
	STYLE = '.',
	KEYFRAMES = '@keyframes '
}
export enum MagnosticElementTypePrefix {
	STYLE = 'css',
	KEYFRAMES = 'anim'
}

export const format = (rendered: string, stringProps: string[]): string => {
	let index = -1
	return rendered.replace(/:,[^;]*;/gm, occurance => {
		index += 1
		return `:${stringProps[index]}${occurance.slice(2, -1)};`
	}).replace(/:[^,;]*,;/gm, occurance => {
		index += 1
		return `:${occurance.slice(1, -2)}${stringProps[index]};`
	}).replace(/,+/, '').replace(/__k__/gm, ' ')
}

export type MagnosticElementTypeSettings = {
	type: string;
	selector: string;
	prefix: string;
}

export class MagnosticElement {
	type: string
	className: string
	styles: string
	template: TemplateStringsArray
	constructor(settings: MagnosticElementTypeSettings, template: TemplateStringsArray, ...props: MagnosticProp[]) {
		const _id = uniqueId()
		const {type, selector, prefix} = settings
		this.type = type
		this.className = `${prefix}-${_id}`
		this.template = template
		const stringProps: string[] = []
		const renderedProps: Array<string | undefined> = props.map((element: MagnosticProp) => {
			if ((element as MagnosticStyle).type && (element as MagnosticStyle).type === MagnosticElementTypeAlias.STYLE)
				return `${(element as MagnosticElement).template}\n`
			if ((element as MagnosticKeyframes).type && (element as MagnosticKeyframes).type === MagnosticElementTypeAlias.KEYFRAMES)
				stringProps.push(`__k__${element}__k__`)
			else
				stringProps.push(String(element))
			return undefined
		})
		const rendered = serialize(compile(`${selector}${this.className} { ${renderedProps} ${template} }`), stringify)
		this.styles = format(rendered, stringProps)
	}

	toString = (): string => this.className
}
