import { 
    Button, 
    FormControl, 
    FormErrorMessage, 
    FormHelperText, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay 
} from '@chakra-ui/react'

import React from 'react'
import { Formik, Form, Field } from 'formik'; 
import { useTasksStore } from '../../../data/TasksStore'

type Props = {
    isOpen: boolean, 
    onClose(): void, 
}

export default function CreateTaskModal({ isOpen, onClose }: Props) {

    let createTask = useTasksStore(task => task.createTask)

    function validateTask(value: string): string {
        let error: string = ""
        if (!value) {
          error = 'Please write a task name first. '
        } 
        return error
    }

    function createNewTask(name: string) {
        createTask(name)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                Add a new task
            </ModalHeader>
            <ModalBody>
                <Formik
                    initialValues={{title: ""}}
                    onSubmit={(values, actions) => {
                        createNewTask(values.title)
                        onClose()
                        actions.setSubmitting(false)
                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='title' validate={validateTask}>
                                {({field, form }: any) => (
                                    <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel>
                                            Task name: 
                                        </FormLabel>
                                        <Input {...field} placeholder='My first task...' />
                                        <FormHelperText>Enter a descriptive task name. </FormHelperText>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                mt={4}
                                isLoading={props.isSubmitting}
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}