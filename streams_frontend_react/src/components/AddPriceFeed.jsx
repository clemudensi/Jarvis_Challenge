import React, {useState} from 'react';
import { Button, Form, Modal} from "react-bootstrap";
import { CURRENCY_OPTIONS, ADD_PRICEFEED } from "../constants";
import {connect} from "react-redux";
import {addStream} from "../actions/get_streams";

const AddPriceFeed = (props) => {
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        symbol: '',
        providerName: '',
        commission: ''
    });

    const handleChange = (e) => {
        e.persist();
        const {name, value} = e.target;
        setInputs({ ...inputs, [name]: value})
    };

    const {
        providerName,
        commission,
        symbol
    } = inputs;

    const reset = () => {
        setInputs({
            symbol: '',
            providerName: '',
            commission: ''
        })
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async e => {
        e.persist();

        //dispatch login props
        await props.addStream(inputs);
    };

    const addFeed = (e) => {
        handleSubmit(e);
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Price Feed
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feed</Modal.Title>
                </Modal.Header>

                {/*AddFeed FORM Starts*/}
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Commission</Form.Label>
                            <Form.Control
                                type="priceFeed"
                                placeholder="Example 1.2"
                                onChange={handleChange}
                                name="commission"
                                value={commission}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Provider</Form.Label>
                            <Form.Control
                                type="priceFeed"
                                placeholder="Enter Provider name"
                                onChange={handleChange}
                                name="providerName"
                                value={providerName}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Example select</Form.Label>
                            <Form.Control  as="select" name="symbol"  onChange={handleChange}>
                                { CURRENCY_OPTIONS.map( option => (
                                    <option key={option} >{option}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="danger" onClick={reset}>Reset</Button>{' '}
                        <Button
                            // type="submit"
                            variant="primary"
                            onClick={addFeed}
                        >
                            Submit
                        </Button>
                    </Form>
                    {/*AddFeed Form Ends*/}

                </Modal.Body>
            </Modal>
        </>
    );
};

export default connect(
    ({ get_streams }) => ({ get_streams }),
    { addStream })(AddPriceFeed);