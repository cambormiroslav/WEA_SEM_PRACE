var data = {};


function addData(inputValue){
    data[inputValue] = {"done": "no"};
}

function doDataChecked(innerData, yes_no){
    data[innerData] = {"done": yes_no};
}

function deleteData(inputValue){
    var del = inputValue.split("<")[0];
    delete data[del];
    console.log(data);
}

function isDone(){
    var node_list_LI = document.getElementsByTagName('LI');
    for (let i = 0; i < node_list_LI.length; i++){
        var text = node_list_LI[i].innerHTML;
        var first_text = text.split("<")[0];
        if(node_list_LI[i].classList.value == "checked"){
            doDataChecked(first_text, "yes");
        }else{
            doDataChecked(first_text, "no");
        }
    }
}