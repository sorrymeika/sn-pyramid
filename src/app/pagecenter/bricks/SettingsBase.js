import { observable, asObservable } from "snowball";
import { JsonComponent } from "nuclear";

export class SettingsBase extends JsonComponent {
    @observable data = {};

    constructor(props) {
        super();

        this.data = {
            ...new.target.defaultData,
            ...props.data,
        };

        const didMount = this.componentDidMount;
        this.componentDidMount = () => {
            asObservable(this).observe('data', (data) => {
                this.props.onChange && this.props.onChange(data);
            });
            didMount && didMount.call(this);
        };

        const renderJson = this.renderJson;

        this.renderJson = () => {
            return [{
                type: 'form',
                props: {
                    ref: (ref) => {
                        this.form = ref && ref.form;
                    }
                },
                children: renderJson.call(this)
            }];
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.data != this.props.data) {
            this.data = {
                ...this.constructor.defaultData,
                ...nextProps.data,
            };
        }
        return true;
    }

    validateFields = (cb) => {
        this.form && this.form.validateFields((err) => {
            cb(err, this.data);
        });
    }
}