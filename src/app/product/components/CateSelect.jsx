import React, { useEffect } from "react";
import { inject } from "snowball/app";
import { Select } from "antd";

function CateSelect(props) {
    const {
        cateId,
        subCateId,
        subSubCateId,
        cates,
        subCates,
        subSubCates,
        onCateChange,
        onSubCateChange,
        onSubSubCateChange,
        disabled
    } = props;

    return (
        <div className="flex mt_s">
            <Select
                value={cateId}
                showSearch
                placeholder={'请选择一级类目'}
                onSelect={onCateChange}
                defaultActiveFirstOption={false}
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                disabled={disabled === true}
            >
                <Select.Option key={0} value={0}>请选择一级类目</Select.Option>
                {
                    cates && cates.map((cate) => {
                        return <Select.Option key={cate.id} value={cate.id}>{cate.name}</Select.Option>;
                    })
                }
            </Select>
            <Select
                value={subCateId}
                showSearch
                placeholder={'请选择二级类目'}
                onSelect={onSubCateChange}
                defaultActiveFirstOption={false}
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                style={{ marginLeft: 5 }}
                disabled={disabled === true}
            >
                <Select.Option key={0} value={0}>请选择二级类目</Select.Option>
                {
                    subCates && subCates.map((cate) => {
                        return <Select.Option key={cate.id} value={cate.id}>{cate.name}</Select.Option>;
                    })
                }
            </Select>
            <Select
                value={subSubCateId}
                showSearch
                placeholder={'请选择三级类目'}
                onSelect={onSubSubCateChange}
                defaultActiveFirstOption={false}
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                style={{ marginLeft: 5 }}
                disabled={disabled === true}
            >
                <Select.Option key={0} value={0}>请选择三级类目</Select.Option>
                {
                    subSubCates && subSubCates.map((cate) => {
                        return <Select.Option key={cate.id} value={cate.id}>{cate.name}</Select.Option>;
                    })
                }
            </Select>
        </div>
    );
}

const ServiceWrapper = ({ cateSelectService, value, onChange, ...props }) => {
    useEffect(() => {
        cateSelectService.onChange((vals) => {
            onChange && onChange(vals);
        });
    }, [cateSelectService, onChange]);

    useEffect(() => {
        cateSelectService.onInit.emit();
    }, [cateSelectService.onInit]);

    const vals = value || [0, 0, 0];
    useEffect(() => {
        cateSelectService.setCates(vals);
    }, [cateSelectService, vals]);

    const cateSelectProps = {
        cateId: cateSelectService.cateId,
        subCateId: cateSelectService.subCateId,
        subSubCateId: cateSelectService.subSubCateId,
        cates: cateSelectService.cates,
        subCates: cateSelectService.subCates,
        subSubCates: cateSelectService.subSubCates,
        onCateChange: cateSelectService.onCateChange.emit,
        onSubCateChange: cateSelectService.onSubCateChange.emit,
        onSubSubCateChange: cateSelectService.onSubSubCateChange.emit
    };

    return <CateSelect {...cateSelectProps} {...props}></CateSelect>;
};

export default inject('cateSelectService')(ServiceWrapper);