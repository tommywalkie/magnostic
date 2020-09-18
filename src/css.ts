import {compile, serialize, stringify} from 'stylis'
import {customAlphabet} from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const format = (rendered: string, stringProps: string[]): string => {
    let index: number = -1
    return rendered.replace(/\:\,[^;]{0,}\;/gm, (occurance) => {
        index = index + 1
        return `:${stringProps[index]}${occurance.slice(2,occurance.length - 1)};`
    })
    .replace(/\:[^,;]{0,}\,\;/gm, (occurance) => {
        index = index + 1
        return `:${occurance.slice(1,occurance.length - 2)}${stringProps[index]};`
    })
    .replace(/\,+/, '')
}

export type MagnosticProp = MagnosticClassName | string | number | Function

export class MagnosticClassName {
	className: string
    styles: string
    template: TemplateStringsArray
    constructor(template: TemplateStringsArray,...props: MagnosticProp[]) {
        const _id = nanoid()
        this.className = `css-${_id}`
        this.template = template
        const stringProps: string[] = []
        const renderedProps: (string | undefined)[] = props.map((el: MagnosticProp) => {
            if ((el as MagnosticClassName).template)
                return `${(el as MagnosticClassName).template}\n`
            stringProps.push(String(el))
        })
        const rendered = serialize(compile(`.${this.className} { ${renderedProps} ${template} }`), stringify)
        this.styles = format(rendered, stringProps)
    }
    toString = (): string => this.className
}