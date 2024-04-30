import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { createUrl } from "../utils/Utils";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddTaskForm = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const apiUrl = createUrl("todo/addTask");
            const response = await axios.post(apiUrl, values);
            console.log("Task added successfully:", response.data);
            handleClose();
            resetForm(); // Reset the form data
        } catch (error) {
            console.error("Error adding task:", error);
            // Handle error if needed
        }
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="mb-3">
                Add Task
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            taskName: "",
                            description: "",
                            dueDate: "",
                            completed: false,
                            userId: sessionStorage.getItem("userId"),
                        }}
                        validationSchema={Yup.object({
                            taskName: Yup.string().required("Required"),
                            description: Yup.string().required("Required"),
                            dueDate: Yup.date().required("Required"),
                            completed: Yup.boolean(),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <FormikForm>
                                <Form.Group controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Field type="text" name="taskName" as={Form.Control} />
                                    <ErrorMessage name="taskName" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Field as="textarea" rows={3} name="description" className="form-control" />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formDueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Field type="date" name="dueDate" as={Form.Control} />
                                    <ErrorMessage name="dueDate" component="div" className="text-danger" />
                                </Form.Group>
                                <Form.Group controlId="formCompleted">
                                    <Form.Label>Completed</Form.Label>
                                    <Field as="select" name="completed" className="form-control">
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </Field>
                                </Form.Group>


                                <Modal.Footer>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Add"}
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default AddTaskForm;
