/*
Az első feladatot együtt csináljuk!
Times url: http://date.jsontest.com
Echo url: http://echo.jsontest.com/alma/10/eper/20/szilva/15
Validate url: http://validate.jsontest.com/?json={name:"Kiss István", kor:14}
hibás url: http://validate.jsontest.com/?json={name:"Kiss István", kor:}
*/

/*ELSŐ FELADAT:*/ 

var state={
    data:{},
    message:""
}

document.getElementById("timemenu").onclick=function(){
    fetchTime()
}

async function fetchTime(){
  var respone= await fetch("http://date.jsontest.com");
  console.log(respone);

  if (respone.ok==false) {
      console.log("ERROR!");
      state.message="Kommunkiációs hiba";
      return;

  }
  var time=await respone.json();
  state.data=time;
  
  render();
}

function render(){
console.log(state.data);
var d=new Date(state.data.milliseconds_since_epoch);
console.log(d.toLocaleString());
var napok=["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"]
console.log(napok[d.getDay()]);

var htmltime="<div class='display-5'>"
+d.toLocaleString()+
" "+napok[d.getDay()]+
"</div>"
document.getElementById("time").innerHTML=htmltime;
}

/*MÁSODIK FELADAT:*/


var statetwo={
    data:{},
    message:""
}

document.getElementById("echomenu").onclick=function(){
    fetchTimetwo();
}


async function fetchTimetwo(){
    var responetwo= await fetch("http://echo.jsontest.com/alma/10/eper/20/szilva/15");
    console.log(responetwo);
  
    if (responetwo.ok==false) {
        console.log("ERROR!");
        statetwo.message="Kommunkiációs hiba";
        return;
  
    }
    var fruit=await responetwo.json();
    console.log(fruit)
    statetwo.data=fruit;
    rendertwo();
  }

  function rendertwo(){
    console.log(statetwo.data);
    var gyumolcsok=["Szilva","Alma","Eper"];
    var osszes=parseInt(statetwo.data.szilva)+parseInt(statetwo.data.alma)+parseInt(statetwo.data.eper);

    var write= `<ul class="list-group">
    <li class="list-group-item">
    <h4>${gyumolcsok[0]}</h4>${statetwo.data.szilva} 
    </li><li class="list-group-item">
    <h4>${gyumolcsok[1]}</h4>${statetwo.data.alma}
    </li><li class="list-group-item">
    <h4>${gyumolcsok[2]}</h4>${statetwo.data.eper}
    </li><li class="list-group-item active">
    <h4>Összesen:</h4>${osszes}
   </li>
   </ul>`

document.getElementById("echo").innerHTML=write;
  }

/*HARMADIK FELADAT:*/

var nev="";
var kor="";
  document.getElementById("validatemenu").onclick=function(){
    input()
}
function kuld(){
    nev=document.getElementById('nev').value;
    kor=document.getElementById('kor').value;
    fetchValidate();
}
async function fetchValidate(){
    
  var respone= await fetch("http://validate.jsontest.com/?json={name:"+nev+", kor:"+kor+"}");
  console.log(respone);

  if (respone.ok==false) {
      console.log("ERROR!");
      state.message="Kommunkiációs hiba";
      return;

  }
  var validate=await respone.json();
  state.data=validate;
  
  renderThree();
}
function renderThree(){
    var kiir=`<p>Megadott adatok ${state.data.validate ? "helyesek!" : "helytelenek!"}</p>`;
    document.getElementById("validate").innerHTML=kiir;
}
function input(){
    var form=`<input type="text" placeholder="nev" id="Név:"><input type="number" placeholder="kor" id="kor"><input type="button" value="ok" onclick="kuld()">`
    document.getElementById("validate").innerHTML=form;


}