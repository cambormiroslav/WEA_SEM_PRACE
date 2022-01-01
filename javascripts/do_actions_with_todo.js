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

editReminder()

//do reminder done
var list = document.querySelector('ul')
list.addEventListener('click', function(ev){
    if(ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
    }
},false)

function newElement(){
    addNewReminder();
}

function addNewReminder(){
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

    closeReminder()

    editReminder()
}

function editReminder(){
    var edit_it = document.getElementsByClassName('edit');

    for(var i = 0; i < edit_it.length; i++){
        edit_it[i].onclick = function(){
            //get value of reminder
            var value_of_reminder_with_buttons = this.parentElement.innerHTML;
            var value_of_reminder = value_of_reminder_with_buttons.split("<")[0];
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
        }
    }
}