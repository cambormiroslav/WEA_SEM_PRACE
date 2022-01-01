var node_list = document.getElementsByTagName('LI');

for (var i = 0; i < node_list.length; i++){
    //close button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className='close';
    span.appendChild(txt);
    node_list[i].appendChild(span);

    //edit button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u270E');
    span.className='edit';
    span.appendChild(txt);
    node_list[i].appendChild(span);
}

var close_it = document.getElementsByClassName('close');

//close reminder = display: none
for(var i = 0; i < close_it.length; i++){
    close_it[i].onclick=function(){
        var div = this.parentElement;
        div.style.display='none';
    }
}

//do reminder done
var list = document.querySelector('ul')
list.addEventListener('click', function(ev){
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
    }
},false)

function newElement(){
    //create new li element
    var li = document.createElement('li');
    var inputValue = document.getElementById("item").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === ''){
        alert("Field can't be empty.");
    }else{
        document.getElementById('list').appendChild(li);
    }

    //get value for new reminder
    document.getElementById('item').value='';

    //add close button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className='close';
    span.appendChild(txt);
    li.appendChild(span);

    //add edit button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u270E');
    span.className='edit';
    span.appendChild(txt);
    li.appendChild(span);
    
    //close reminder = display: none
    var close_it = document.getElementsByClassName('close');

    for(var i = 0; i < close_it.length; i++){
        close_it[i].onclick = function(){
            var div = this.parentElement;
            div.style.display='none';
        }
    }
}