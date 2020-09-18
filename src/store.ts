import type {MagnosticClassName} from './'
import {generateClassName} from './css'

export class MagnosticStore {
    elements: MagnosticClassName[]
    constructor() {
        this.elements = []
    }
    extractCss = (): string => {
        return this.elements.map(
            (className: MagnosticClassName): string => className.styles
        ).join('')
    }
    css = (
        template: TemplateStringsArray,
        ...props: (MagnosticClassName | string | number | Function)[]
    ): MagnosticClassName => {
        const className: MagnosticClassName = generateClassName(template, ...props)
        this.elements.push(className)
        return className
    }
}