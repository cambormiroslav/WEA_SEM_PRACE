
showDataInToDoApp();

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

closeReminder();

editReminder();

//do reminder done
var list = document.querySelector('ul')
list.addEventListener('click', function(ev){
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
        var div_innerHTML = ev.target.innerHTML;
        var div_value = div_innerHTML.split("<")[0];
        sendToExpress("done", div_value);
    }
},false)

function newElement(){
    addNewReminder();
}

function addNewReminder(){
    //create new li element
    var li = document.createElement('li');
    var inputValue = document.getElementById("item").value;
    sendToExpress("add", inputValue);
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === ''){
        alert("Field can't be empty.");
    }else{
        document.getElementById('list').appendChild(li);
    }

    //add default value for input
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

    closeReminder();

    editReminder();
}

function addAddedReminder(inputValue, done){
    //create new li element
    var li = document.createElement('li');
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById('list').appendChild(li);

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

    closeReminder();

    editReminder();

    if(done == 1){
        li.classList.toggle('checked');
    }
}

function editReminder(){
    var edit_it = document.getElementsByClassName('edit');

    for(var i = 0; i < edit_it.length; i++){
        edit_it[i].onclick = function(){
            //get value of reminder
            var value_of_reminder_with_buttons = this.parentElement.innerHTML;
            var value_of_reminder = value_of_reminder_with_buttons.split("<")[0];
            sendToExpress("delete", value_of_reminder);
            document.getElementById('item').value = value_of_reminder;
            //close reminder
            var reminder = this.parentElement;
            reminder.style.display='none';

            //add edit reminder
            var add_button = document.getElementsByClassName('addBtn');
            for(var i = 0; i < add_button.length; i++){
                add_button[i].onclick = function(){
                    addNewReminder();
                }
            }
        }
    }
}

function closeReminder(){
    //close reminder = display: none
    var close_it = document.getElementsByClassName('close');

    for(var i = 0; i < close_it.length; i++){
        close_it[i].onclick = function(){
            var div = this.parentElement;
            div.style.display='none';
            var div_innerHTML = div.innerHTML;
            var div_value = div_innerHTML.split("<")[0];
            sendToExpress("delete", div_value);
        }
    }
}

function sendToExpress(action, value){
    fetch("/todo",{
        method:'POST',
        body:`action=${action}&value=${value}`,
        headers: {
            "Content-type":"application/x-www-form-urlencoded"
        }
    });
    return;
}

async function showDataInToDoApp(){
   const response = await fetch("/json");
   var reminders = await response.json();
   for(const x in reminders){
        addAddedReminder(reminders[x]["reminder"],reminders[x]["done"]);
   }
}

function logOut(){
    fetch("/logout",{
        method:'GET',
    }); 
}