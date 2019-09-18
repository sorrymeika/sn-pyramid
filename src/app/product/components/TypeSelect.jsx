import React, { useEffect } from 'react';
import { Select } from 'antd';
import { inject } from 'snowball/app';

function SpuTypeSelect(props) {
    const { typeId, disabled, subTypeId, types, subTypes, onTypeChange, onSubTypeChange } = props;
    return (
        <div className="flex mt_s">
            <Select
                disabled={disabled}
                value={typeId}
                showSearch
                placeholder={'请选择主类型'}
                onSelect={onTypeChange}
                defaultActiveFirstOption={false}
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
            >
                <Select.Option key={0} value={0}>请选择主类型</Select.Option>
                {
                    types && types.map((item) => {
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>;
                    })
                }
            </Select>
            <Select
                disabled={disabled}
                value={subTypeId}
                showSearch
                placeholder={'请选择子类型'}
                onSelect={onSubTypeChange}
                defaultActiveFirstOption={false}
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                style={{ marginLeft: 5 }}
            >
                <Select.Option key={0} value={0}>请选择子类型</Select.Option>
                {
                    subTypes && subTypes.map((item) => {
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>;
                    })
                }
            </Select>
        </div>
    );
}


export default inject('spuTypeSelectService')(({ spuTypeSelectService, value, onChange, ...props }) => {
    useEffect(() => {
        spuTypeSelectService.onInit.emit(value);
    }, [spuTypeSelectService, spuTypeSelectService.onInit, value]);

    useEffect(() => {
        return spuTypeSelectService.onChange((vals) => {
            onChange && onChange(vals);
        });
    }, [spuTypeSelectService, onChange]);

    const typeSelectProps = {
        typeId: spuTypeSelectService.typeId,
        subTypeId: spuTypeSelectService.subTypeId,
        types: spuTypeSelectService.types,
        subTypes: spuTypeSelectService.subTypes,
        onTypeChange: spuTypeSelectService.onTypeChange.emit,
        onSubTypeChange: spuTypeSelectService.onSubTypeChange.emit,
    };

    return <SpuTypeSelect {...typeSelectProps} {...props}></SpuTypeSelect>;
});