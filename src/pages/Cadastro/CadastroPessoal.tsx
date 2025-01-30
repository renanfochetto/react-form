import {Button, Label, Fieldset, Input, Form, Titulo, ErrorMessage} from "../../components";
import {useForm} from "react-hook-form";

interface FormInputTipos {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaVerificada: string;
}

const CadastroPessoal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } =useForm<FormInputTipos>();

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados);
  }

  const senha = watch('senha');

  const validaSenha = {
    obrigatorio: (valor: string) => !!valor || 'Campo de senha é obrigatório',
    tamanhoMinimo: (valor: string) => valor.length >= 6 || 'A senha deve ter pelo menos 6 caracteres',
    senhasIguais: (valor: string) => valor === senha || 'As senhas não correspondem',

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
            $error={!!errors.nome}
            {...register('nome', {required: 'Campo de nome é obrigatório', minLength: {
              value: 3,
              message: 'Nome deve ter no mínimo 3 caracteres'
              }
            })}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            {...register('email', { required: 'O Campo de e-mail é obrigatório', validate: validarEmail })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Input
            id="campo-telefone"
            type="text"
            placeholder="Ex: (DD) XXXXX-XXXX"
            {...register('telefone', {
              pattern: {
                value: /\(\d{2}\)\s\d{5}-\d{4}/,
                message: 'O telefone está inserido no formato incorreto.'
              },
              required: 'Campo de telefone é obrigatório'
            })}
          />
          {errors.telefone && <ErrorMessage>{errors.telefone.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            {...register('senha', { required: 'Campo de senha é obrigatório', minLength: {
              value: 6,
              message: 'Senha deve ter no mínimo 6 caracteres'
              }})}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            {...register('senhaVerificada', {
              required: 'Repita a senha anterior',
              validate: validaSenha,
            })}
          />
          {errors.senhaVerificada && <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>}
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
