import React from "react";
import CateSelect from "./CateSelect";
import { NCForm, NCFormItem, NCSearch } from "nuclear";
import { Input, Button } from "antd";
import TypeSelect from "./TypeSelect";

function ProductSearchForm({ onSearch, defaultParams }) {
    return (
        <NCSearch title="商品查询">
            <NCForm
                defaultData={defaultParams}
                onSubmit={onSearch}
            >
                <div className="flex">
                    <NCFormItem
                        label="系统类目"
                        field="cate"
                        labelSpan={5}
                        className="fx_2"
                    >
                        <CateSelect></CateSelect>
                    </NCFormItem>
                    <NCFormItem
                        label="SPU ID"
                        field="spuId"
                        className="fx_1"
                        rules={[{ pattern: /^\d+$/, message: '必须为数字' }]}
                    >
                        <Input />
                    </NCFormItem>
                </div>
                <div className="flex">
                    <NCFormItem
                        label="商品类型"
                        field="status"
                        className="fx_1"
                    >
                        <TypeSelect></TypeSelect>
                    </NCFormItem>
                    <NCFormItem
                        label="关键字"
                        field="title"
                        className="fx_1"
                    >
                        <Input placeholder="品牌/商品名" />
                    </NCFormItem>
                </div>
                <div className="ta_c">
                    <Button type="primary" htmlType="submit" icon="search">查询</Button>
                    <Button htmlType="button" className="ml_l">重置</Button>
                </div>
            </NCForm>
        </NCSearch>
    );
}

export default ProductSearchForm;