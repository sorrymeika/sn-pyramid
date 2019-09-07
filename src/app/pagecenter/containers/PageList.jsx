import React, { useRef } from 'react';
import { NCMain, NCBreadcrumb, NCCard, NCToolbar, NCForm, NCFormItem } from 'nuclear';
import { Button, Input, Table, Divider, Modal } from 'antd';
import { inject } from 'snowball/app';

export function PageList({ pageListService }) {
    return (
        <NCMain>
            <NCBreadcrumb items={['活动页列表']} />
            <NCCard>
                <NCToolbar>
                    <Button type="primary" htmlType="button" onClick={pageListService.onClickAddPage.emit}>新增活动页</Button>
                    <NCToolbar.Right>
                        <PageSearchForm></PageSearchForm>
                    </NCToolbar.Right>
                </NCToolbar>
                <PageTable></PageTable>
                <PageAddModal></PageAddModal>
            </NCCard>
        </NCMain>
    );
}

const PageSearchForm = inject(({ pageListService }) => ({
    onSearch: pageListService.onSearch.emit
}))(({ onSearch }) => {
    return (
        <NCForm
            layout="inline"
            onSubmit={onSearch}
        >
            <NCFormItem
                field="keywords"
                label="关键字"
            >
                <Input placeholder="`ID`或名称" />
            </NCFormItem>
            <NCFormItem>
                <Button type="primary" htmlType="submit">查询</Button>
            </NCFormItem>
        </NCForm>
    );
});

const PageTable = inject(({ pageListService }) => ({
    dataSource: pageListService.pageList,
    pageIndex: pageListService.pageIndex,
    pageSize: pageListService.pageSize,
    total: pageListService.total,
    onPageChange: pageListService.onPageChange.emit,
}))(({
    dataSource,
    pageIndex,
    pageSize,
    total,
    onPageChange
}) => {
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '标题',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '短链接',
        key: 'link',
        render(text, record) {
            return '/market/' + record.id;
        }
    }, {
        title: '操作',
        key: 'op',
        width: 180,
        render(text, record) {
            return (
                <>
                    <a
                        href="javascript:;"
                        onClick={() => window.open('#/pagecenter/edit/' + record.id)}
                    >编辑</a>
                    <Divider type="vertical"></Divider>
                    <a href="javascript:;">复制</a>
                    {
                        record.status == 3 && (
                            <>
                                <Divider type="vertical"></Divider>
                                <a href="javascript:;">发布</a>
                            </>
                        )
                    }
                </>
            );
        }
    }];

    return (
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
    );
});

const PageAddModal = inject(({ pageListService }) => ({
    visible: pageListService.isModalVisible,
    onOk: pageListService.onAddPage.emit,
    onCancel: pageListService.onCancelAddPage.emit,
}))(
    ({ visible, onOk, onCancel, onError }) => {
        const formRef = useRef();

        return (
            <Modal
                title={'新增页面'}
                visible={visible}
                okText="确定"
                onOk={() => {
                    formRef.current.submit();
                }}
                defaultData={{}}
                cancelText="取消"
                onCancel={onCancel}
            >
                <PageForm
                    onSubmit={onOk}
                    onError={onError}
                    ref={formRef}
                ></PageForm>
            </Modal>
        );
    }
);

const PageForm = React.forwardRef(({
    defaultData,
    onSubmit,
    onError
}, ref) => {
    return (
        <NCForm
            ref={ref}
            defaultData={defaultData}
            onSubmit={onSubmit}
            onError={onError}
        >
            <NCFormItem
                label="标题"
                labelSpan={4}
                field="name"
                rules={[{ required: true, message: '页面标题必填' }]}
            >
                <Input />
            </NCFormItem>
        </NCForm>
    );
});

