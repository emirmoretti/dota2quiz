let $name = document.getElementById("name");
let $image = document.getElementById("image");
let $contador = document.getElementById("contador");
let $btn1 = document.getElementById("btn1");
let $btn2 = document.getElementById("btn2");
let $btn3 = document.getElementById("btn3");
let $btn4 = document.getElementById("btn4");
let imageString = "";
let count = 0;
$contador.innerHTML = count;

let dota2_heros = async () => {
  let response = await fetch("https://api.opendota.com/api/heroes");
  let data = await response.json();
  return data;
};

async function cargarPjs() {
  const json = await dota2_heros();
  let [] = NrosAleatorios();
  stringImg = cargarImagen(n, json);
  $image.setAttribute("src", stringImg);
  const pjOK = json[n];
  const pjInco1 = json[n2];
  const pjIncor2 = json[n3];
  const pjIncor3 = json[n4];
  let arr = [pjOK, pjInco1, pjIncor2, pjIncor3];
  arr.sort(() => Math.random() - 0.5);
  $btn1.innerHTML = arr[0].localized_name;
  $btn1.setAttribute("pj", arr[0].name.replace("npc_dota_hero_", ""));
  $btn2.innerHTML = arr[1].localized_name;
  $btn2.setAttribute("pj", arr[1].name.replace("npc_dota_hero_", ""));
  $btn3.innerHTML = arr[2].localized_name;
  $btn3.setAttribute("pj", arr[2].name.replace("npc_dota_hero_", ""));
  $btn4.innerHTML = arr[3].localized_name;
  $btn4.setAttribute("pj", arr[3].name.replace("npc_dota_hero_", ""));
}
cargarPjs();

function NrosAleatorios() {
  do {
    n = nroRandom();
    n2 = nroRandom();
    n3 = nroRandom();
    n4 = nroRandom();
  } while (n === n2 && n2 === n3 && n3 === n4);
  return [n, n2, n3, n4];
}

let nroRandom = () => Math.floor(Math.random() * (122 - 0)) + 0;

let cargarImagen = (n, json) => {
  imageString = json[n].name.replace("npc_dota_hero_", "");
  let urlImage = `http://cdn.dota2.com/apps/dota2/images/heroes/${imageString}_sb.png`;
  return urlImage;
};

const clickGame = (evt) => {
  let pj = evt.target.attributes.pj.value;
  console.log(pj);
  console.log(stringImg);
  if (pj == imageString) {
    console.log("correcto!");
    cargarPjs();
    count++;
    $contador.innerText = count;
  } else {
    $contador.innerText = "gg";
    count = 0;
    setTimeout(() => {
      $contador.innerText = count;
    }, 2000);
  }
};

$btn1.addEventListener("click", clickGame);
$btn2.addEventListener("click", clickGame);
$btn3.addEventListener("click", clickGame);
$btn4.addEventListener("click", clickGame);
