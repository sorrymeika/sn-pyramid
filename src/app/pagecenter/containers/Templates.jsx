
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, Select, Checkbox, InputNumber, message, Divider } from "antd";
import { createControlledForm, ImageUpload } from "nuclear";
import { TEMPLATE_GROUPS } from "../constants/TEMPLATE_GROUPS";

const FormItem = Form.Item;

const templateTypes = [{
    type: 1,
    name: '图片'
}];

const pageTypes = [{
    type: 1,
    name: '首页'
}, {
    type: 2,
    name: '营销页'
}, {
    type: 3,
    name: '店铺首页'
}, {
    type: 4,
    name: '店铺营销页'
}];

function Templates({ dataSource, search, addTemplate, updateTemplate }) {
    const [searchData, setSearchData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [formData, setFormData] = useState({});

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
        render: (text, record) => {
            const type = templateTypes.find(item => item.type == record.type);
            return (
                <span>{type && type.name}</span>
            );
        }
    }, {
        title: '支持页面类型',
        dataIndex: 'supportPageTypes',
        key: 'supportPageTypes',
        render: (text, record) => {
            const supportPageTypes = (record.supportPageTypes || '').split(',');
            const types = pageTypes.filter(item => supportPageTypes.findIndex((spt) => Number(spt) == item.type) !== -1);
            return (
                <span>{types.map((type) => type.name).join(', ')}</span>
            );
        }
    }, {
        title: '分组',
        dataIndex: 'groupId',
        key: 'groupId',
        render: (text, record) => {
            const group = TEMPLATE_GROUPS.find(item => item.id == record.groupId);
            return (
                <span>{group && group.name}</span>
            );
        }
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a
                    href="javascript:;"
                    onClick={() => {
                        const supportPageTypes = (record.supportPageTypes || '').split(',').map(Number);

                        setEditModalVisible(true);
                        setFormData({
                            ...record,
                            supportPageTypes
                        });
                    }}
                >编辑</a>
                <Divider type="vertical" />
                <a href="javascript:;">禁用</a>
            </span>
        ),
    }];

    return (
        <div className="pd_m">
            <div className="flex mb_m">
                <div className="flex_1">
                    <Button onClick={() => setModalVisible(true)}>新增模版</Button>
                </div>
                <SearchForm
                    data={searchData}
                    onChange={setSearchData}
                    onSearch={() => search(searchData)}
                ></SearchForm>
            </div>
            <AdditionModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={
                    (data) => addTemplate(data)
                        .then((res) => {
                            message.success('添加成功');
                            setModalVisible(false);
                        })
                        .catch(e => {
                            message.error(e.message || '添加失败');
                        })
                }
            />
            <EditModal
                visible={editModalVisible}
                formData={formData}
                setFormData={setFormData}
                onCancel={() => setEditModalVisible(false)}
                onOk={
                    (data) => updateTemplate(data)
                        .then((res) => {
                            message.success('修改成功');
                            setEditModalVisible(false);
                        })
                        .catch(e => {
                            message.error(e.message || '修改失败');
                        })
                }
            />
            <Table
                rowKey={'id'}
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
}

const SearchForm = createControlledForm()(function (props) {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline" onSubmit={
            (e) => {
                e.preventDefault();
                props.onSearch();
            }
        }>
            <FormItem label="名称">
                {getFieldDecorator('name')(
                    <Input
                        placeholder="输入模板名称"
                    />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">查询</Button>
            </FormItem>
        </Form>
    );
});

function AdditionModal({ visible, onCancel, onOk }) {
    const [formData, setFormData] = useState({});

    const formRef = React.createRef();

    useEffect(() => {
        if (visible && formRef.current) {
            formRef.current.resetFields();
        }
    }, [formRef, visible]);

    return (
        <Modal
            title="添加模板"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                formRef.current.validateFieldsAndScroll((err, data) => {
                    if (err) {
                        return message.error('请完整填写模板信息');
                    }
                    onOk && onOk(data);
                });
            }}
            width={'96%'}
            style={{ marginTop: '-100px' }}
        >
            <TemplateForm
                ref={formRef}
                data={formData}
                onChange={setFormData}
            ></TemplateForm>
        </Modal>
    );
}

function EditModal({ formData, setFormData, visible, onCancel, onOk }) {
    const formRef = React.createRef();
    return (
        <Modal
            title="修改模板"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                formRef.current.validateFieldsAndScroll((err, data) => {
                    if (err) {
                        return message.error('请完整填写模板信息');
                    }
                    onOk && onOk({ ...formData, ...data });
                });
            }}
            width={'96%'}
            style={{ marginTop: '-100px' }}
        >
            <TemplateForm
                ref={formRef}
                data={formData}
                onChange={setFormData}
            ></TemplateForm>
        </Modal>
    );
}

const TemplateForm = createControlledForm()(function TemplateForm(props) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    return (
        <Form
            {...formItemLayout}
        >
            <FormItem label="模板名称">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入模板名称!' }],
                })(
                    <Input
                        placeholder="输入模板名称"
                    />
                )}
            </FormItem>
            <FormItem label="模板类型">
                {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择模板类型!' }],
                })(
                    <Select
                        showSearch
                        placeholder="选择模板类型"
                        defaultActiveFirstOption={false}
                        dropdownMatchSelectWidth={false}
                        optionFilterProp="children"
                    >
                        {
                            templateTypes.map((item) => (
                                <Select.Option key={item.type} value={item.type}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                )}
            </FormItem>
            <FormItem label="支持页面类型">
                {getFieldDecorator('supportPageTypes')(
                    <Checkbox.Group
                        options={pageTypes.map((item) => ({ label: item.name, value: item.type }))}
                    />
                )}
            </FormItem>
            <FormItem label="图片">
                {getFieldDecorator('image')(
                    <ImageUpload
                        action={'http://localhost:7001/admin/testUpload'}
                        restrict={{
                            minWidth: 90,
                            maxWidth: 180,
                            minHeight: 90,
                            maxHeight: 180,
                            isSquare: true
                        }}
                        limit={1}
                        processResponse={(response) => response.fileName}
                        composeSrc={(src) => `http://localhost:7001/admin/testFile?file=${src}`}
                    />
                )}
            </FormItem>
            <FormItem label="排序">
                {getFieldDecorator('sorting', {
                    rules: [{ required: true, message: '请输入排序!' }],
                    initialValue: 1
                })(
                    <InputNumber
                        placeholder="输入排序"
                    />
                )}
            </FormItem>
            <FormItem label="模板分组">
                {getFieldDecorator('groupId', {
                    rules: [{ required: true, message: '请选择模板分组!' }],
                })(
                    <Select
                        showSearch
                        placeholder="选择模板分组"
                        defaultActiveFirstOption={false}
                        dropdownMatchSelectWidth={false}
                        optionFilterProp="children"
                    >
                        {
                            TEMPLATE_GROUPS.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                )}
            </FormItem>
            <FormItem label="预览">
                {getFieldDecorator('preview')(
                    <Input.TextArea
                        autosize={{ minRows: 2, maxRows: 100 }}
                        placeholder="输入预览模板"
                    />
                )}
            </FormItem>
            <FormItem label="模板css">
                {getFieldDecorator('css', {
                    rules: [{ required: true, message: '请输入模板样式!' }],
                })(
                    <Input.TextArea
                        autosize={{ minRows: 5, maxRows: 100 }}
                        placeholder="输入模板样式"
                    />
                )}
            </FormItem>
            <FormItem label="模板内容">
                {getFieldDecorator('html', {
                    rules: [{ required: true, message: '请输入模板内容!' }],
                })(
                    <Input.TextArea
                        autosize={{ minRows: 5, maxRows: 100 }}
                        placeholder="输入模板内容"
                    />
                )}
            </FormItem>
            <FormItem label="其他属性">
                {getFieldDecorator('props')(
                    <Input.TextArea
                        autosize={{ minRows: 2, maxRows: 100 }}
                        placeholder="其他属性"
                    />
                )}
            </FormItem>
        </Form>
    );
});

export { Templates };