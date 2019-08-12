import { observable } from "snowball";
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
            this.asModel().observe('data', (data) => {
                this.props.onChange && this.props.onChange(data);
            });
            didMount && didMount.call(this);
        };
    }
}