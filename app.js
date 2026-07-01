const LOGIN_CODE = "100029"

async function login(){

  const code =
  document.getElementById("loginCode").value

  if(code !== LOGIN_CODE){
    alert("登录码错误")
    return
  }

  document
  .getElementById("loginPage")
  .classList.add("hide")

  document
  .getElementById("mainPage")
  .classList.remove("hide")

  loadData()
}

function toggleMenu(){

  document
  .getElementById("menuPanel")
  .classList.toggle("show")
}

function openAdd(){

  document
  .getElementById("addModal")
  .classList.remove("hide")
}

async function addData(){

  const data = {

    name:
    document.getElementById("name").value,

    age:
    document.getElementById("age").value,

    gender:
    document.getElementById("gender").value,

    game:
    document.getElementById("game").value,

    rank:
    document.getElementById("rank").value,

    school:
    document.getElementById("school").value
  }

  await supabaseClient
  .from("peiwans")
  .insert([data])

  alert("添加成功")

  document
  .getElementById("addModal")
  .classList.add("hide")

  loadData()
}

async function loadData(){

  const { data } =
  await supabaseClient
  .from("peiwans")
  .select("*")
  .order("id",{ascending:false})

  const table =
  document.getElementById("tableBody")

  table.innerHTML = ""

  data.forEach(item=>{

    table.innerHTML += `
      <tr>

        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.gender}</td>
        <td>${item.game}</td>
        <td>${item.rank}</td>
        <td>${item.school}</td>

        <td>

          <button
          class="action-btn delete"
          onclick="deleteData(${item.id})">
          删除
          </button>

        </td>

      </tr>
    `
  })
}

async function deleteData(id){

  if(!confirm("确定删除？")) return

  await supabaseClient
  .from("peiwans")
  .delete()
  .eq("id",id)

  loadData()
}

async function exportData(){

  const { data } =
  await supabaseClient
  .from("peiwans")
  .select("*")

  const blob =
  new Blob(
    [JSON.stringify(data,null,2)],
    {type:"application/json"}
  )

  const a =
  document.createElement("a")

  a.href =
  URL.createObjectURL(blob)

  a.download = "陪玩信息.json"

  a.click()
}