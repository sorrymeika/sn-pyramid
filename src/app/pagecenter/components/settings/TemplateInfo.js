import React, { Component } from 'react';
import { ViewModel } from 'snowball';
import { inject } from 'snowball/app';

class TemplateInfo extends Component {

    componentDidUpdate() {
        const { currentModule } = this.props;
        const { template } = currentModule;

        if (template && template.extProps && template.extProps.example && this.exampleRef) {
            if (!this.exampleViewModel || this.exampleViewModel.attributes.example !== template.extProps.example) {
                this.exampleViewModel && this.exampleViewModel.destroy();
                this.exampleRef.innerHTML = '';
                this.exampleViewModel = new ViewModel(this.extProps.example, Object.assign({}, template.extProps, {
                    bizData: currentModule.data.bizData
                }));
                this.exampleViewModel.$el.appendTo(this.exampleRef);
            } else {
                this.exampleViewModel.set(Object.assign({}, this.extProps, {
                    bizData: currentModule.data.bizData
                }));
            }
        }
    }

    setExampleRef = (ref) => {
        this.exampleRef = ref;
    }

    render() {
        const { currentModule, children } = this.props;
        const { template } = currentModule;

        if (!template) {
            return null;
        }

        let { description } = template;
        if (description && description.startsWith('[') && description.endsWith(']')) {
            description = template.name;
        }

        return (
            <div className="pd_l pb_s">
                <h1 className="fs_xl mb_l">{template.name}</h1>
                <div className="cl_999 mb_m fs_s">{description}</div>
                {
                    template.extProps.example
                        ? (
                            <div className="mb_m">
                                <h2 className="fs_m">示例</h2>
                                <div ref={this.setExampleRef}></div>
                            </div>
                        )
                        : null
                }
                {children}
            </div>
        );
    }
}


export { TemplateInfo };