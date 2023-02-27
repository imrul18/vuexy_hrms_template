// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Label,
  Input,
  Table,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components

// ** FAQ Illustrations
import { useDispatch } from 'react-redux'
import { getRoles } from '../store'

// ** Vars

const AddRoleModal = ({show, setShow, handleModalClosed, onSubmit, onReset, errors}) => {

  const dispatch = useDispatch()

  useState(() => {
    dispatch(getRoles())
  }, [])

  // ** Hooks
  const {
    control,
    handleSubmit
  } = useForm({ defaultValues: { roleName: '' } })

  return (
    <Fragment>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-5 pb-5'>
          <div className='text-center mb-4'>
            <h1>Add Role</h1>
          </div>
          <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Label className='form-label' for='roleName'>
                Role Name
              </Label>
              <Controller
                name='roleName'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='roleName' placeholder='Enter role name' invalid={errors.roleName && true} />
                )}
              />
              {errors.roleName && <FormFeedback>{errors.roleName.value}</FormFeedback>}
            </Col>
            <Col className='text-center mt-2' xs={12}>
              <Button type='submit' color='primary' className='me-1'>
                Submit
              </Button>
              <Button type='reset' outline onClick={onReset}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddRoleModal
