import React, { Component } from "react";
import { Table, Divider, Icon, message } from "antd";
import { inject } from "snowball/app";
import ProductSearchForm from "./ProductSearchForm";

@inject('productService')
class ProductTransfer extends Component {
    columns = [{
        title: 'SPU ID',
        key: 'id',
        dataIndex: 'id'
    }, {
        title: '标题',
        key: 'title',
        dataIndex: 'title'
    }, {
        title: '操作',
        width: 90,
        key: 'op',
        render: (text, row) => {
            return (
                <a
                    disabled={this.state.results.findIndex((item) => item.id == row.id) !== -1}
                    href="javascript:;"
                    onClick={this.selectItem.bind(this, row)}
                >选择</a>
            );
        }
    }];

    resultColumns = [{
        title: 'SPU ID',
        key: 'id',
        dataIndex: 'id'
    }, {
        title: '标题',
        key: 'title',
        dataIndex: 'title'
    }, {
        title: '操作',
        width: 100,
        key: 'op',
        render: (text, row, index) => {
            return (
                <>
                    {
                        index !== 0 &&
                        <Icon
                            type="up-circle"
                            className="mr_s"
                            onClick={this.swapItem.bind(this, index, index - 1)}
                        />
                    }
                    {
                        index !== this.state.results.length - 1 &&
                        <Icon
                            type="down-circle"
                            onClick={this.swapItem.bind(this, index, index + 1)}
                        />
                    }
                    <Divider type="vertical"></Divider>
                    <a
                        onClick={this.removeItem.bind(this, row)}
                    >删除</a>
                </>
            );
        }
    }];

    state = {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        results: [],
        defaultParams: {}
    }

    searchParams = {};

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        const prev = (prevProps.products || [])
            .map(prd => prd.id)
            .join(',');
        const current = (this.props.products || [])
            .map(prd => prd.id)
            .join(',');

        if (prev != current) {
            this.setState(() => ({
                pageIndex: 1,
                defaultParams: {}
            }));
            this.init();
        }
    }

    async init() {
        this.loadData();

        const { products, productService } = this.props;
        if (products && products.length && products.every(item => item.id)) {
            const res = await productService.getSpusByIds(products.map((item) => item.id));
            this.setState({
                results: res.data
            });
        } else {
            this.setState({
                results: []
            });
        }
    }

    getResults() {
        return this.state.results.map(item => ({ id: item.id }));
    }

    search = (searchParams) => {
        this.setState(({ pageIndex }) => ({
            pageIndex: 1
        }));
        this.searchParams = searchParams;
        this.loadData();
    }

    handlePageChange(pageIndex) {
        this.setState(() => ({
            pageIndex
        }));
        this.loadData();
    }

    async loadData() {
        const res = await this.props.productService.search({
            ...this.searchParams,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
        });
        this.setState({
            total: res.total,
            dataSource: res.data
        });
    }

    selectItem(spu) {
        const { results } = this.state;
        if (results.findIndex((item) => item.id == spu.id) !== -1) {
            message.error('不可重复加入商品');
            return;
        }
        results.push(spu);
        this.setState({
            results
        });
    }

    removeItem(spu) {
        const { results } = this.state;
        const index = results.findIndex((item) => item.id == spu.id);
        if (index !== -1) {
            results.splice(index, 1);
            this.setState({
                results
            });
        }
    }

    swapItem(fromIndex, toIndex) {
        const { results } = this.state;
        const tmp = results[fromIndex];
        results[fromIndex] = results[toIndex];
        results[toIndex] = tmp;
        this.setState({
            results
        });
    }

    render() {
        return (
            <>
                <ProductSearchForm
                    onSearch={this.search}
                ></ProductSearchForm>
                <div className="flex ai_s">
                    <div className="fx_1">
                        <Table
                            rowKey="id"
                            columns={this.columns}
                            dataSource={this.state.dataSource}
                            size="small"
                            pagination={{
                                current: this.state.pageIndex,
                                pageSize: this.state.pageSize,
                                total: this.state.total,
                                onChange: this.handlePageChange
                            }}
                        />
                    </div>
                    <div className="ps_r" style={{ width: 30 }}>
                        <div className="ps_a ta_c" style={{ width: 30, left: 0, top: "50%", marginTop: -10 }}>>></div>
                    </div>
                    <div className="fx_1">
                        <Table
                            rowKey="id"
                            columns={this.resultColumns}
                            dataSource={this.state.results}
                            size="small"
                            pagination={false}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default ProductTransfer;