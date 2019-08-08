import React, { Component } from 'react';
import { ViewModel } from 'snowball';
import { inject } from 'snowball/app';

class TemplateInfo extends Component {

    componentDidUpdate() {
        const { currentTemplate, currentBrick } = this.props;

        if (currentTemplate && currentTemplate.preview && this.previewRef) {
            if (!this.previewViewModel || this.previewViewModel.attributes.example !== currentTemplate.preview) {
                this.previewViewModel && this.previewViewModel.destroy();
                this.previewRef.innerHTML = '';
                this.previewViewModel = new ViewModel(currentTemplate.preview, {
                    templateProps: currentTemplate.props,
                    data: currentBrick.data,
                    brickProps: currentBrick.props
                });
                this.previewViewModel.$el.appendTo(this.previewRef);
            } else {
                this.previewViewModel.set({
                    templateProps: currentTemplate.props,
                    data: currentBrick.data,
                    brickProps: currentBrick.props
                });
            }
        }
    }

    setExampleRef = (ref) => {
        this.previewRef = ref;
    }

    render() {
        const { currentTemplate, children } = this.props;
        if (!currentTemplate || !currentTemplate.id) {
            return null;
        }

        return (
            <div className="pd_l pb_s">
                <h1 className="fs_xl mb_l">{currentTemplate.name}配置</h1>
                <div className="cl_999 mb_m fs_s">{currentTemplate.description}</div>
                {
                    currentTemplate.preview
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

const TemplateInfoInjc = inject(({ decorationService }) => (
    decorationService
        ? {
            currentTemplate: decorationService.currentTemplate,
            currentBrick: decorationService.currentBrick
        }
        : {}
))(TemplateInfo);

export { TemplateInfoInjc as TemplateInfo };