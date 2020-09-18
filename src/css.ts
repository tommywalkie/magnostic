import type {MagnosticClassName} from './'
import {compile, serialize, stringify} from 'stylis'
import {customAlphabet} from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)

const format = (rendered: string, stringProps: string[]): string => {
    let index: number = -1
    return rendered.replace(/\:\,\;/gm, (occurance) => {
        index = index + 1
        return `:${stringProps[index]}${occurance.slice(2,occurance.length - 1)};`
    })
    .replace(/\:\,[^;]{0,}\;/gm, (occurance) => {
        index = index + 1
        return `:${stringProps[index]}${occurance.slice(2,occurance.length - 1)};`
    })
    .replace(/\:[^,;]{0,}\,\;/gm, (occurance) => {
        index = index + 1
        return `:${occurance.slice(1,occurance.length - 2)}${stringProps[index]};`
    })
    .replace(/\,+/, '')
}

export const generateClassName = (
    template: TemplateStringsArray,
    ...props: (MagnosticClassName | string | number | Function)[]
): MagnosticClassName => {
    const _id = nanoid()
	const instance: MagnosticClassName = function () {return `css-${_id}`}
    instance.className = `css-${_id}`
    instance.template = template
    const stringProps: string[] = []
    const renderedProps = props.map((el: MagnosticClassName | string | number | Function) => {
        if ((el as MagnosticClassName).template)
            return `${(el as MagnosticClassName).template}\n`
        else
            stringProps.push(String(el))
    })
    const rendered = serialize(compile(`.${instance.className} { ${renderedProps} ${template} }`), stringify)
    const computed = format(rendered, stringProps)
    instance.styles = `${computed}`
    instance.toString = () => String(instance.className)
    return instance
}