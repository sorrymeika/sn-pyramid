import React, { } from 'react';
import { NCMain, NCBreadcrumb, NCCard, NCToolbar, NCForm, NCFormItem } from 'nuclear';
import { Button, Input, Table, Divider } from 'antd';

function PageTable({
    dataSource,
    pageIndex,
    pageSize,
    total,
    onPageChange
}) {
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
        render(text, record) {
            return (
                <>
                    <a href="javascript:;">编辑</a>
                    <Divider type="horizontal"></Divider>
                    <a href="javascript:;">复制</a>
                    {
                        record.status == 3 && (
                            <>
                                <Divider type="horizontal"></Divider>
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
            pagination={{
                total,
                current: pageIndex,
                size: pageSize,
                onChange: onPageChange
            }}
        ></Table>
    );
}

function PageList() {
    return (
        <NCMain>
            <NCBreadcrumb items={['活动页列表']} />
            <NCCard>
                <NCToolbar>
                    <Button type="primary" htmlType="button">新增活动页</Button>
                    <NCToolbar.Right>
                        <NCForm
                            layout="inline"
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
                    </NCToolbar.Right>
                </NCToolbar>
                <PageTable></PageTable>
            </NCCard>
        </NCMain>
    );
}

export { PageList };