import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from './index';

describe('Deve renderizar um campo de input', () => {
   test(' no documento', ()=> {
      render(<Formulario />)
      const campoTexto = screen.getByPlaceholderText('Digite um valor')
      expect(campoTexto).toBeInTheDocument();
   })
   
   test(' com o type number', ()=> {
      render(<Formulario />)
      const campoTexto = screen.getByPlaceholderText('Digite um valor')
      expect(campoTexto).tohaveAttribute('type', 'number');
   })
   
   test(' que pode ser preenchido', () => {
      render(<Formulario />);
      const campoTexto = screen.getByPLaceholderText('Digite um valor');
      userEvent.type(campoTexto, '50');
      expect(campoTexto).toHaveValue(50)
   })
})

test('Deve chamar um evento de onSubmit ao clicar em realizar transaçao', () => {
   const realizarTransacao = jest.fn();

   render(<Formulario realizarTransacao={realizarTransacao} />);
   const botao = screen.getByRole('button');

   userEvent.click(botao)
   expect(realizarTransacao).toHaveBeenCalledTimes(1);
})

test('Deve ser possível selecionar uma opção do elemento <select/>', () => {
   render(<Formulario />);
   const select = screen.getByRole('combobox');
   userEvent.selectOptions(select, ['Depósito']);

   expect(
      screen.getByRole('option', { name: 'Selecione um tipo de transação' })
         .selected
   ).toBe(false);
   expect(screen.getByRole('option', { name: 'Depósito' }).selected).toBe(
      true
   );
});