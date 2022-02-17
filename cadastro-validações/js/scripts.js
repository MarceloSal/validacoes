//validações
function validation() {
  let birthday = document.getElementById("birth").value;
  let data = birthday.split("/");
  let cpf = document.getElementById("cpfNumber").value;
  let nome = document.getElementById("nameComplete").value;
  let motherName = document.getElementById("mNameTxt").value;
  let checkbox = document.getElementById("agreement");
  //validação CPF

  var rest;
  sum = 0;
  if (cpf == "00000000000") return false;

  if (cpf.length > 11) {
    alert("cpf não informado ou inválido");

    return false;
  }

  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;

  if (rest != parseInt(cpf.substring(9, 10))) {
    alert("cpf não informado ou inválido");

    return false;
  }

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;

  if (rest != parseInt(cpf.substring(10, 11))) {
    alert("cpf não informado ou inválido");

    return false;
  }

  //Validação Nome completo
  // Pega valor do campo
  nomeSobrenome =
    /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
  // Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres. Aceita acentuação e rejeita números.

  // Faz a validacao do regex no campo indicado
  if (!nomeSobrenome.test(nome)) {
    alert("Nome não digitado ou inválido");
    nome.focus();
    return;
  }

  //Validação nome completo da mãe
  nomeCompletoMae =
    /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
  // Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres. Aceita acentuação e rejeita números.

  // Faz a validacao do regex no campo indicado
  if (!nomeCompletoMae.test(motherName)) {
    alert("Nome da mãe não digitado ou inválido");

    return;
  }

  //validação da escolha do genero
  if ($("#gender").val() == "") {
    alert("informe seu sexo");
    $("#gender").focus();

    return;
  }

  //validação da data de nascimento
  var ExpReg = new RegExp(
    "(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}"
  );
  data = birthday.split("/");
  erro = false;
  if (birthday.search(ExpReg) == -1) {
    erro = true;
  } else if (
    (data[1] == 4 || data[1] == 6 || data[1] == 9 || data[1] == 11) &&
    data[0] > 30
  )
    erro = true;
  else if (data[1] == 2) {
    if (data[0] > 28 && data[2] % 4 != 0) erro = true;
    if (data[0] > 29 && data[2] % 4 == 0) erro = true;
  }

  if (new Date().getFullYear() - data[2] > 120) {
    erro = true;
  }

  if (new Date(data[2], data[1] - 1, data[0]) > new Date()) {
    erro = true;
  }

  if (erro) {
    alert("data inválida!!!");
    $("#birth").focus();
    birthday.value = "";
    return false;
  }

  //validação do telefone
  if ($("#telNumber").val() == "" || $("#telNumber").val().length < 14) {
    alert("telefone não informado ou inválido");
    $("#telNumber").focus();

    return;
  }

  //validação  CEP
  let cep = document.getElementById("cep").value;
  if (cep == "") {
    alert("digite o numero do cep");

    cep.focus();
    return;
  }

  if (checkbox.checked) {
    alert("cadastro validado com sucesso");
  } else {
    alert(
      "por favor, leia os termos de serviço e marque a caixinha para prosseguir"
    );
  }

  checkbox.focus();
  return;
}

//evento de clique no botao de enviar o cadastro
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (validation()) {
    console.log("Enviar o formulário");
  }
  //não envia o formulário
});
