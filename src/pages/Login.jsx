import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import '../styles/form.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate()

  const submit = data => {
    console.log(data)
    axios
      .post('https://e-commerce-jjbn.onrender.com/users/login', data )
      .then(res => {
        //almacenar el token en el localStorage
        localStorage.setItem('token', res.data.token)
        navigate('/')
      })
      .catch(err => {
        console.error(err)
        if( err.response.status === 401){
          alert('Usuario incorrecto')
        }
      })
  }

  return (
    <main>
      <Form onSubmit={handleSubmit(submit)}>
        <h1>LOGIN</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="usuario@correo.com" {...register('email')} />
          <Form.Text className="text-muted">
            No compartas nunca tu correo
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" {...register('password')} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar sesion
        </Button>
      </Form>
    </main>
  );
};

export default Login;
