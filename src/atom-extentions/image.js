import { SFSImageUpload } from 'sn-cornerstone';
import { Atom } from 'nuclear';

Atom.registerAtom('image', Atom.wrapFormItem(SFSImageUpload, {
    defaultProps: {
        labelLineBreak: true
    },
    extendProps(props) {
        return {
            help: SFSImageUpload.createHelp(props)
        };
    }
}));