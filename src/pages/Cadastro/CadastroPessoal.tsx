import { Button, Label, Fieldset, Input, Form, Titulo } from "../../components";
import {useForm} from "react-hook-form";

interface FormInputTipos {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaVerificada: string;
}

const CadastroPessoal = () => {
  const { register, handleSubmit } =useForm<FormInputTipos>();

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados);
  }

  function validarEmail(valor: string) {
    const formatoEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!formatoEmail.test(valor)) {
      console.error('Endereço de e-mail inválido.');
      return false;
    }
    return true;
  }

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            {...register('nome', {required: true, minLength: 5})}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            {...register('email', { required: true, validate: validarEmail })}

          />
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Input
            id="campo-telefone"
            type="text"
            placeholder="Ex: (DD) XXXXX-XXXX"
            {...register('telefone', {pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/})}

          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            {...register('senha')}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            {...register('senhaVerificada')}
          />
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
