import type {MagnosticProp} from './css'
import {MagnosticClassName} from './css'

export class MagnosticStore {
    elements: MagnosticClassName[]
    constructor() {
        this.elements = []
    }
    extractCss = (): string => this.elements.map(
        (className: MagnosticClassName): string => className.styles
    ).join('')
    css = (
        template: TemplateStringsArray,
        ...props: MagnosticProp[]
    ): MagnosticClassName => {
        const className: MagnosticClassName = new MagnosticClassName(template, ...props)
        this.elements.push(className)
        return className
    }
}