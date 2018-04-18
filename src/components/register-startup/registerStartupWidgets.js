
import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';




export const TextWidget = (props) => {
    const { BaseInput } = props.registry.widgets;
    return <BaseInput autoComplete={props.options.autoComplete} type={props.options.type || "text"} {...props} />;
};
export const TermsAndConditions = (props) => {
    const {id, value, required, disabled, readonly, label, autofocus, onChange } = props;
    return (
        <label>
            <input
                type="checkbox"
                id={id}
                checked={typeof value === "undefined" ? false : value}
                required={required}
                disabled={disabled || readonly}
                autoFocus={autofocus}
                onChange={event => onChange(event.target.checked)}
            />
            <span>I hereby acknowledge that i have read and agreed to the TECHFEST <Link target="_blank" to="/terms-conditions">terms and conditions</Link></span>
        </label>
    )
};
export const NeedsTransport = (props) => {
    const { RadioWidget } = props.registry.widgets;
    return (<div>
            <RadioWidget  {...props} />
            <Button tag="a" target="_blank" href="https://www.flixbus.com/bus-routes?wt_eid=2152154974100568657&wt_t=1521722684528&_ga=2.252078351.780838453.1521722659-854922651.1521549741 ">Flixbus Routes</Button>
        </div>
    );
};

export const FileWidget = (props) => {
    return (
        <input type="file"
               id={props.id}
               accept="application/pdf"
               required={props.required}
               onChange={(event) => processFile(event.target.files).then(props.onChange)} />
    )
};
export let uploadFiles = [];
function processFile(files) {
    let file = files[0];
    uploadFiles.push(file);
    return new Promise((resolve, reject) => {
        file ? resolve(file.name) : resolve(undefined)
    });
}
