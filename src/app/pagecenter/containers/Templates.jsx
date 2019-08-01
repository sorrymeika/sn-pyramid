
import React, { useState } from "react";
import { Button, Table, Modal, Form, Input } from "antd";

const FormItem = Form.Item;

function Templates({ dataSource }) {
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    }, {
        title: '支持页面类型',
        dataIndex: 'supportPageTypes',
        key: 'supportPageTypes',
    }, {
        title: '分组',
        dataIndex: 'groupId',
        key: 'groupId',
    }];

    const [modalVisible, setDialogVisible] = useState(false);

    console.log(modalVisible);

    return (
        <div className="pd_m">
            <div className="flex mb_m">
                <div className="flex_1">
                    <Button onClick={() => setDialogVisible(true)}>新增模版</Button>
                </div>
                <div>
                    <Button>Clear filters and sorters</Button>
                </div>
            </div>
            <AdditionModal
                visible={modalVisible}
                onCancel={() => setDialogVisible(false)}
            ></AdditionModal>
            <Table
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
}

function AdditionModal({ visible, onCancel }) {
    return (
        <Modal
            title="添加模板"
            visible={visible}
            onCancel={onCancel}
            width={'96%'}
            style={{ marginTop: '-100px' }}
        >
            <AdditionForm></AdditionForm>
        </Modal>
    );
}

const AdditionForm = Form.create()(function AdditionForm(props) {
    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    return (
        <Form {...formItemLayout}>
            <FormItem label="模板名称">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入模板名称!' }],
                })(
                    <Input
                        placeholder="输入模板名称"
                    />
                )}
            </FormItem>
        </Form>
    );
});

export { Templates };