
import React, { useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import { NCToolbar, NCForm, NCFormItem } from 'nuclear';
import { inject } from 'snowball/app';

function _FormulaSelect({
    dataSource,
    pageIndex,
    pageSize,
    total,
    onInit,
    onSearch,
    onPageChange,
    onSelect
}) {
    useEffect(() => {
        onInit && onInit();
    }, [onInit]);

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '商品类型',
        dataIndex: 'types',
        key: 'types',
        render(text, item) {
            return item.typeNames.join(',');
        }
    }, {
        title: '商品类目',
        dataIndex: 'cates',
        key: 'cates',
        render(text, item) {
            return item.cateNames.join(',');
        }
    }, {
        title: '价格区间',
        dataIndex: 'minPrice',
        key: 'minPrice',
        render(text, item) {
            return [item.minPrice, item.maxPrice].filter((price) => price != null).join('~');
        }
    }, {
        title: '销量区间',
        dataIndex: 'minSales',
        key: 'minSales',
        render(text, item) {
            return [item.minSales, item.maxSales].filter((sales) => sales != null).join('~');
        }
    }, {
        title: '操作',
        key: 'op',
        width: 150,
        render(text, item) {
            return (
                <a
                    href="javascript:;"
                    onClick={() => onSelect(item)}
                >选择</a>
            );
        }
    }];

    return (
        <>
            <NCToolbar>
                <NCForm
                    onSubmit={onSearch}
                    style={{ maxWidth: 400 }}
                >
                    <div className="flex">
                        <NCFormItem
                            label="关键字"
                            field="keywords"
                            className="fx_1"
                        >
                            <Input placeholder="ID / 名称" />
                        </NCFormItem>
                        <NCFormItem className="ml_s">
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </NCFormItem>
                    </div>
                </NCForm>
            </NCToolbar>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    total,
                    current: pageIndex,
                    size: pageSize,
                    onChange: onPageChange
                }}
            ></Table>
        </>
    );
}

const FormulaSelect = inject(['formulaSelectService'], ([formulaSelectService]) => {
    return {
        total: formulaSelectService.total,
        pageIndex: formulaSelectService.pageIndex,
        pageSize: formulaSelectService.pageSize,
        dataSource: formulaSelectService.formulas,
        onInit: formulaSelectService.onInit.emit,
        onSearch: formulaSelectService.onSearch.emit,
        onPageChange: formulaSelectService.onPageChange.emit,
    };
})(_FormulaSelect);

export { FormulaSelect };