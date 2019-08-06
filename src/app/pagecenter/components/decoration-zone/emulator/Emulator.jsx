import React, { Component } from 'react';
import { inject } from 'snowball/app';
import { FixedLayer } from './FixedLayer';
import { Phone } from './Phone';
import { Brick } from './Brick';

@inject("bricks", 'templates')
class Emulator extends Component {
    render() {
        const { head, before, after, bricks, templates, children } = this.props;
        const brickList = [];

        bricks.forEach((item, i) => {
            const template = templates.find((tpl) => tpl.id == item.templateId);
            if (!template.html) {
                return;
            }
            const component = (
                <Brick
                    index={i}
                    key={`mod${item.id}`}
                    template={template}
                    brick={item}
                />
            );
            const isFixed = template.props.isFixed;

            brickList.push({
                isFixed,
                sort: template.props.sort,
                component
            });
        });

        console.log(brickList);

        return (
            <div>
                <FixedLayer>
                    {
                        brickList
                            .filter((item) => item.isFixed)
                            .map((item, i) => Object.assign(item, { i }))
                            .sort((a, b) => (b.sort || 0) - (a.sort || 0))
                            .map((item) => item.component)
                    }
                </FixedLayer>
                <Phone
                    head={head}
                    before={before}
                    after={after}
                >
                    {
                        brickList
                            .filter((item, i) => {
                                if (item.isFixed) {
                                    return false;
                                }
                                item.id = i;
                                return true;
                            })
                            .sort((a, b) => ((b.sort || 0) - (a.sort || 0)) || (a.id - b.id))
                            .map((item) => item.component)
                    }
                </Phone>
                {children}
            </div>
        );
    }
}

export { Emulator };