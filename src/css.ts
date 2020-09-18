import {MagnosticElement, MagnosticProp, MagnosticElementTypeAlias, MagnosticElementTypeSelector, MagnosticElementTypePrefix, MagnosticElementTypeSettings} from './element'

export class MagnosticStyle extends MagnosticElement {
	constructor(template: TemplateStringsArray, ...props: MagnosticProp[]) {
		const settings: MagnosticElementTypeSettings = {
			type: MagnosticElementTypeAlias.STYLE,
			selector: MagnosticElementTypeSelector.STYLE,
			prefix: MagnosticElementTypePrefix.STYLE
		}
		super(settings, template, ...props)
	}
}
