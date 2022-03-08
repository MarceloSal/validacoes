$('form').on('submit', (e) => {
  e.preventDefault();
  console.log('validando')
  validation()
})

let message = '';
const validation = () => {
  agreementValidation();
  cepValidation();
  phoneValidation();
  birthDateValidation();
  genderValidation();
  motherNameValidation();
  pacientNameValidation();
  cpfValidation();
  exibirErro(message)
  message = ''
}

function exibirErro(message) {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
     
}
  
     
const cpfValidation = () => {
  cpf = $("#cpf").val().replace(/[\(\)\.\s-]+/g, '');
  if (cpf == ""
    || cpf.length > 11
    || cpf == "00000000000"
    || cpf == "11111111111"
  ) {
    $("#cpf").focus();
    message = `- CPF não informado ou inválido \n${message}`;
    return;
  } 
    
  

  var rest;

  sum = 0;
  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);

  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;

  if (rest != parseInt(cpf.substring(9, 10))) {
    $("#cpf").focus();
    message = `- CPF não informado ou inválido \n${message}`;

    return;
  }
  

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);

  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;

  if (rest != parseInt(cpf.substring(10, 11))) {
    $("#cpf").focus();
    message = `- CPF não informado ou inválido \n${message}`;
    return;
  }
}

// const alertMessage = () => {
//   if (validation()) {
//     alert(message)
//   }
// }

const nameValidation = (element, field) => {
  nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
  // Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres. Aceita acentuação e rejeita números.
  if (!nomeSobrenome.test(element.val())) {
    $(element).focus();
    message = `- ${field} não preenchido ou incorreto \n${message}`;
    
  }
}

const pacientNameValidation = () => {
  nameValidation($("#nameComplete"), "Nome");
}

const motherNameValidation = () => {
  nameValidation($("#motherName"), "Nome da Mãe");
}

const genderValidation = () => {
  if ($("#gender").val() == "") {
    $('#gender').focus()
    message = `- Informe seu sexo. \n${message}`
    return;
  }
}

const birthDateValidation = () => {
  let data = $('#birth').val().split("/");

  const expReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
  erro = false;
  if ($('#birth').val().search(expReg) == -1) {
    erro = true;
  } else if (
    (data[1] == 4 || data[1] == 6 || data[1] == 9 || data[1] == 11) 
    && data[0] > 30
  ) {
    erro = true;
  } else if (data[1] == 2) {
    if (data[0] > 28 && data[2] % 4 != 0) erro = true;
    if (data[0] > 29 && data[2] % 4 == 0) erro = true;
  }

  if (new Date().getFullYear() - data[2] > 120) erro = true;
  if (new Date(data[2], data[1] - 1, data[0]) > new Date()) erro = true;
  if(erro){
    $('#birth').focus();
    message = `- data inválida \n${message}`
    return;
  }
    
}

const phoneValidation = () => {
  if ($("#telNumber").val() == "" || $("#telNumber").val().length < 14) {
    $('#telNumber').focus()
    message = `- telefone não informado ou inválido \n${message}`
    return;
  }
}

const cepValidation = () => {
  if ($('#cep').val() == "") {
    $('#cep').focus()
    message = `-cep não informado \n${message}`
    return;
  }
  // $("#cep").trigger()
}

const agreementValidation = () => {
  if ($('#agreement').is(':checked')){
    message = `Cadastro realizado com sucesso.\n${message}`
    
  } else {
    $('#agreement').focus()
    message = `- Leia os termos de serviço e marque a caixinha para prosseguir \n${message}`
  }
}
