import {MagnosticElement, MagnosticProp, MagnosticElementTypeAlias, MagnosticElementTypePrefix, MagnosticElementTypeSelector, MagnosticElementTypeSettings} from './element'

export class MagnosticKeyframes extends MagnosticElement {
	constructor(template: TemplateStringsArray, ...props: MagnosticProp[]) {
		const settings: MagnosticElementTypeSettings = {
			type: MagnosticElementTypeAlias.KEYFRAMES,
			selector: MagnosticElementTypeSelector.KEYFRAMES,
			prefix: MagnosticElementTypePrefix.KEYFRAMES
		}
		super(settings, template, ...props)
	}
}
