import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const FilterPrice = () => {

  const { register, reset, handleSubmit } = useForm() 
  
  const submit = data => {
    
  }

  return (
    <Form className='formPrice' onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor='from'>From</Form.Label>
        <Form.Control {...register('from')} type="number" id='from'/>
        <Form.Text className="text-muted">

        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label htmlFor='to'>To</Form.Label>
        <Form.Control {...register('to')} type="number" id='to' />
      </Form.Group>
      <Button variant="primary" type="submit">
        Filter Price
      </Button>
    </Form>
  )
}

export default FilterPrice
