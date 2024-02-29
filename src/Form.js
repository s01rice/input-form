import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Radio, Space, ConfigProvider, Button, Form, Input, Switch } from 'antd';
import { data } from './data.js';

const FormClass = () => {

    // Set default state from data.js
    const [user, setUser] = useState({
        name: "",
        isProficient: data.isProficient,
        toolsUsed: data.toolsUsed.split(','),
    });

    const [disabled, setDisabled] = useState(false);
    const toggleDisabled = () => {
        setDisabled(!disabled);
    };

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    // Process button output state to console
    const handleSubmit = () => {
        console.log(user);
    }

    const [value, setValue] = useState(user.isProficient);
    const onRadio = (e) => {
        // console.log('Radio event: ', e.target.value);
        setValue(e.target.value);
        handleChange(e);
    }

    const toolsOptions = [
        { label: 'Redux', value: '0' },
        { label: 'Lodash', value: '1' },
        { label: 'Ant design', value: '2' },
        { label: 'Webpack', value: '3' },
        { label: 'Other', value: '4' },
    ];
    const onChange = (checkedValues) => {
        // console.log('Checkbox event: ', checkedValues);
        setUser({
            ...user,
            toolsUsed: checkedValues
        })
    };

    return (
        <div className='w-96 m-auto text-center border rounded-3xl py-10 px-10 bg-white shadow-lg'>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#8100ff",
                    },
                    components: {
                        Radio: {
                            dotSize: 16,
                        }
                    }
                }}>
                <div className="flex justify-between mb-4">
                    <h1>Editable</h1>
                    <Switch className="w-2 shadow-[inset_0_0px_4px_rgba(130,0,220,0.7)]" defaultChecked onChange={toggleDisabled} />
                </div>
                <Form disabled={disabled} className='flex flex-col' onFinish={handleSubmit}>
                    <Form.Item>
                        <Input name="name" onChange={handleChange} placeholder="" className="pt-4 border border-gray-300 rounded-lg focus:ring-1 hover:ring-purple-500 focus:ring-purple-500 py-2 mb-2" />
                        <span className="floating-label">First Name</span>
                    </Form.Item>
                    <h1 className='text-left mt-2 px-1 font-bold text-base'>Are you proficient in ReactJS development?</h1>
                    <Form.Item>
                        <Radio.Group name="isProficient" className='flex flex-col text-left mt-3 px-1' onChange={onRadio} value={value}>
                            <Space direction="vertical">
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <h1 className='text-left mt-2 px-1 text-base font-bold'>Which tools do you use?</h1>
                    <h2 className='text-left text-sm text-gray-500 px-1'>Please select all that apply.</h2>
                    <Form.Item>
                        <Checkbox.Group name="toolsUsed" className='flex flex-col mt-3 px-1' options={toolsOptions} defaultValue={user.toolsUsed} onChange={onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit" className=" bg-[#8100ff] disabled:bg-[#eeddff] text-white disabled:text-white text-base font-semibold w-[200px] mt-4 h-14" shape="round">Process</Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    )
};

export default FormClass;